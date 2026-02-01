import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-whatsapp-button',
    standalone: true,
    imports: [CommonModule],
    template: `
    <a
      href="https://wa.me/14162778097?text=Hello,%20I%20would%20like%20to%20discuss%20your%20services"
      target="_blank"
      rel="noopener noreferrer"
      class="whatsapp-button"
      aria-label="Contact us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 3 .97 4.29L2 22l6.29-.97C9.95 22.64 11.45 23 13 23c5.52 0 10-4.48 10-10S17.52 2 12 2zm0 18c-1.41 0-2.73-.36-3.88-.99l-.28-.15-2.89.44.44-2.89-.15-.27C4.36 14.73 4 13.41 4 12c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8zm3.97-6.29c-.22-.11-1.29-.64-1.49-.71-.2-.07-.35-.11-.5.11-.15.22-.58.71-.71.86-.13.15-.26.17-.48.05-.22-.11-.92-.34-1.76-.99-.65-.58-1.09-1.29-1.22-1.51-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.28-.02-.39-.06-.11-.5-1.2-.68-1.64-.18-.44-.36-.38-.5-.39-.13-.01-.28-.01-.43-.01-.15 0-.39.06-.59.28-.2.22-.76.74-.76 1.8 0 1.06.78 2.08.89 2.22.11.15 1.53 2.34 3.71 3.28 1.91.81 2.66.77 3.14.72.47-.05 1.29-.53 1.47-1.04.18-.51.18-.94.13-1.04-.05-.09-.2-.15-.42-.25z"/>
      </svg>
    </a>
  `,
    styles: [`
    .whatsapp-button {
      position: relative;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background: linear-gradient(135deg, #25d366, #20ba5f);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      opacity: 0.9;
      text-decoration: none;
    }

    .whatsapp-button:hover {
      background: linear-gradient(135deg, #20ba5f, #1da852);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      transform: translateY(-2px);
      opacity: 1;
    }

    .whatsapp-button:active {
      transform: translateY(0);
    }

    .whatsapp-button svg {
      width: 1.5rem;
      height: 1.5rem;
    }
    `]
})
export class WhatsappButtonComponent { }
