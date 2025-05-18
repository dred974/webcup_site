import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface UserCreate { name: string; email: string; password: string; }
interface UserResponse { id: number; name: string; email: string; posts: any[]; }

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  createUser(user: UserCreate): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.baseUrl}/users/`, user);
  }

  updatePassword(userId: number, newPassword: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/users/${userId}/password/`, { password: newPassword });
  }

  getUser(userId: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.baseUrl}/users/${userId}`);
  }

  addPost(userId: number, title: string, content: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/posts/${userId}/`, { title, content });
  }
}
