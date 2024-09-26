import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { io, Socket } from 'socket.io-client';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamingService {
  private socket!: Socket;
  private localStream!: MediaStream;
  private peerConnections: { [id: string]: RTCPeerConnection } = {};
  private isBrowser: boolean;
  private userId: string | null = null;
  public isStreaming: boolean = false;
  private _streamId: string | null = null;
  get streamId(): string | null {
    return this._streamId;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private authService: AuthService, private http: HttpClient) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  initialize(): void {
    if (this.isBrowser) {
      setTimeout(() => {
        this.userId = this.authService.getCurrentUserId();
        if (!this.userId) {
          console.error('User ID is null. Please check the authentication service.');
          return;
        }
        this.initializeSocket();
      }, 0);
    }
  }

  private initializeSocket(): void {
    this.socket = io('http://localhost:3004');
    
    this.socket.on('connect', () => {
      console.log('Connected to signaling server with socket ID:', this.socket.id);
    });

    this.socket.on('user-joined', (id: string) => {
      console.log('User joined:', id);
      this.createPeerConnection(id);
    });

    this.socket.on('signal', (data: any) => {
      this.handleSignal(data);
    });

    this.socket.on('stream-started', (data: { userId: string, socketId: string }) => {
      console.log('Stream started by user:', data.userId, 'with socket ID:', data.socketId);
    });

    this.socket.on('error', (message: string) => {
      console.error('Server error:', message);
    });
  }

  async startStream(): Promise<void> {
    if (!this.userId) {
      console.error('User ID is not available');
      return;
    }
    this._streamId = this.userId;
    await this.startScreenCapture();
    console.log('Starting stream with User ID:', this.userId);
    this.socket.emit('start-stream', this.userId);
    this.isStreaming = true;

    let pc = this.peerConnections[this.userId];
    if (!pc) {
      pc = this.createPeerConnection(this.userId);
    }

    if (pc.signalingState === 'stable' && !pc.localDescription) {
      console.log('Création de l\'offre initiale');
      try {
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        console.log('Envoi de l\'offre initiale');
        this.socket.emit('signal', {
          to: this.userId,
          from: this.userId,
          signal: { sdp: pc.localDescription }
        });
      } catch (e) {
        console.error('Erreur lors de la création de l\'offre initiale:', e);
      }
    } else {
      console.log('La connexion n\'est pas dans un état approprié pour créer une offre');
    }
  }

  async joinStream(userIdToJoin: string): Promise<void> {
    console.log('Tentative de connexion à l\'utilisateur avec l\'ID:', userIdToJoin);
    if (!this.socket) {
      console.error('Socket non initialisée. Assurez-vous que initializeSocket a été appelé.');
      return;
    }
    if (userIdToJoin) {
      if (userIdToJoin === this.userId) {
        console.error('You cannot join your own stream.');
        return;
      }
      console.log('Joining stream with User ID:', userIdToJoin);
      this.socket.emit('join-stream', userIdToJoin);
      this.isStreaming = true;
    } else {
      console.error('Please enter a valid User ID to join.');
    }
  }

  private async startScreenCapture(): Promise<void> {
    if (!this.isBrowser || !navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
      console.error('getDisplayMedia is not supported in this browser.');
      return;
    }

    try {
      this.localStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
      console.log('Local stream initialized:', this.localStream);
      const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
      localVideo.srcObject = this.localStream;
    } catch (error) {
      console.error('Error accessing display media.', error);
    }
  }

  private createPeerConnection(id: string): RTCPeerConnection {
    const pc = new RTCPeerConnection();

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit('signal', {
          to: id,
          from: this.socket.id,
          signal: { candidate: event.candidate }
        });
      }
    };

    pc.ontrack = (event) => {
      console.log('Événement ontrack déclenché:', event);
      if (event.streams && event.streams[0]) {
        console.log('Flux distant reçu, appel de addRemoteStream');
        this.addRemoteStream(event.streams[0]);
      } else {
        console.warn('Événement ontrack sans flux');
      }
    };

    pc.onnegotiationneeded = async () => {
      console.log('Négociation nécessaire pour:', id);
      try {
        if (pc.signalingState !== "stable") {
          console.log("Négociation ignorée, l'état de signalisation n'est pas stable");
          return;
        }
        console.log("Création d'une offre");
        const offer = await pc.createOffer();
        if (pc.signalingState !== "stable") {
          console.log("L'état de signalisation a changé, annulation de l'offre");
          return;
        }
        await pc.setLocalDescription(offer);
        console.log("Envoi de l'offre SDP");
        this.socket.emit('signal', {
          to: id,
          from: this.userId,
          signal: { sdp: pc.localDescription }
        });
      } catch (e) {
        console.error('Erreur lors de la négociation:', e);
      }
    };

    pc.oniceconnectionstatechange = () => {
      console.log('État de la connexion ICE:', pc.iceConnectionState);
    };

    this.peerConnections[id] = pc;

    if (this.localStream) {
      this.addTracksToConnection(pc);
    }

    return pc;
  }

  private addTracksToConnection(pc: RTCPeerConnection): void {
    this.localStream.getTracks().forEach(track => pc.addTrack(track, this.localStream));
  }

  private addRemoteStream(stream: MediaStream): void {
    console.log('Fonction addRemoteStream appelée avec le flux:', stream);
    const remoteVideo = document.createElement('video');
    remoteVideo.srcObject = stream;
    remoteVideo.autoplay = true;
    remoteVideo.controls = true;
    remoteVideo.style.width = '100%';
    remoteVideo.style.maxWidth = '600px';
    remoteVideo.style.border = '2px solid #fff';

    remoteVideo.onloadedmetadata = () => {
      console.log('Métadonnées de la vidéo distante chargées');
      remoteVideo.play().catch(e => console.error('Erreur lors de la lecture de la vidéo:', e));
    };

    const container = document.getElementById('remoteVideosContainer');
    if (!container) {
      console.error('Conteneur des vidéos distantes non trouvé dans le DOM');
      return;
    }
    container.appendChild(remoteVideo);
    console.log('Nouvel élément vidéo ajouté au conteneur');
  }

  private async handleSignal(data: any): Promise<void> {
    console.log('Signal reçu:', data);
    console.log('Type de signal:', data.signal.sdp ? 'SDP' : 'ICE Candidate');
    let pc = this.peerConnections[data.from];

    if (!pc) {
      console.log('Création d\'une nouvelle connexion peer pour:', data.from);
      pc = this.createPeerConnection(data.from);
    }

    console.log('État actuel de la connexion peer:', pc.signalingState);

    if (data.signal.sdp) {
      const description = new RTCSessionDescription(data.signal.sdp);
      console.log('Traitement du signal SDP, type:', description.type);
      
      if (description.type === 'offer') {
        if (pc.signalingState !== 'stable') {
          console.log('Connexion non stable, rollback en cours...');
          await Promise.all([
            pc.setLocalDescription({type: 'rollback'}),
            pc.setRemoteDescription(description)
          ]);
        } else {
          await pc.setRemoteDescription(description);
        }
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        console.log('Envoi de la réponse SDP');
        this.socket.emit('signal', {
          to: data.from,
          from: this.userId,
          signal: { sdp: pc.localDescription }
        });
      } else if (description.type === 'answer') {
        if (pc.signalingState === 'have-local-offer') {
          await pc.setRemoteDescription(description);
        } else {
          console.log('Réponse reçue dans un état inattendu:', pc.signalingState);
        }
      }
    } else if (data.signal.candidate) {
      console.log('Ajout d\'un candidat ICE');
      try {
        await pc.addIceCandidate(new RTCIceCandidate(data.signal.candidate));
      } catch (e) {
        console.error('Erreur lors de l\'ajout du candidat ICE:', e);
      }
    }
  }

  getUserId(): string | null {
    return this.userId;
  }
  

  getActiveStreams(): Observable<string[]> {
  return this.http.get<string[]>('http://localhost:3004/active-streams');
}
}