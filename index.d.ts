interface User {
  bio: string;
  created_at: string;
  displayName: string;
  email: string;
  fullName: string;
  id: number;
}
interface Message {
  text: string;
  recipientId: number;
  userId: number;
  id?: number;
  createdAt?: string;
  fileUrl?: string;
}
interface TypingData {
  userId: number;
  recipientId: number;
  isTyping: boolean;
}
