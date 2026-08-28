import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
  menuAbierto = false;
  mensajeEmail = signal('');

  enviarEmail(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;

    emailjs.sendForm(
      'service_63twut3',
      'template_gkxmo5m',
      form,
      'ig2Bei84IOwDCIyYA'
    )
      .then(() => {
        this.mensajeEmail.set('¡Mensaje enviado correctamente!');
        form.reset();

        setTimeout(() => {
          this.mensajeEmail.set('');
        }, 5000);
      })
      .catch((error) => {
        console.error('Error al enviar el mensaje:', error);

        this.mensajeEmail.set(
          'Hubo un error al enviar el mensaje. Intentá nuevamente.'
        );
      });
  }



  scrollToSection(id: string) {
    this.menuAbierto = false;

    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }, 50);
  }
}
