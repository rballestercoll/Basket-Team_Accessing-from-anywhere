import { Injectable } from '@angular/core';
import { Player } from '../model/players';

@Injectable({
  providedIn: 'root',
})
export class PlayersService {
  players: Player[] = [
    {
      id: 1,
      nombre: 'Juan Carlos Navarro',
      num: 7,
      posicion: 'Escoltas',
      edad: '43',
      anillos: false,
      descripcion:
        'Juan Carlos Navarro Feijoo (nacido el 13 de junio de 1980 en San Feliu de Llobregat, Barcelona) es un exjugador de baloncesto español que jugó 20 temporadas en la ACB y una más en la NBA. Con una estatura de 1,93 metros, su posición en la cancha era la de escolta. Actualmente, ocupa el puesto de director general de la sección de baloncesto del Fútbol Club Barcelona. Pasó prácticamente toda su carrera en el equipo de baloncesto del Barcelona en la ACB (1998-2007 y 2008-2018), donde se formó y posteriormente fue capitán. Con el equipo, consiguió 23 títulos, incluyendo ocho Ligas, siete Copas, cinco Supercopas y dos Euroligas. Además, fue el máximo anotador histórico de la Euroliga durante varios años, acumulando 4152 puntos, hasta ser superado por el griego Vasileios Spanoulis en enero de 2020. Durante la temporada 2007-2008, jugó en la NBA con los Memphis Grizzlies, donde coincidió con su compatriota Pau Gasol.',
      img: 'assets/img/Juan_Carlos_Navarro.jpg',
      video: '../assets/video/Juan_Carlos_Navarro.mp4',
    },
    {
      id: 2,
      nombre: 'Pau Gasol',
      num: 16,
      posicion: 'Ala-pivot',
      edad: '43',
      anillos: '2 (2009, 2010)',
      descripcion:
        'Pau Gasol Sáez (nacido en Barcelona el 6 de julio de 1980) es un exbaloncestista español que jugó 18 temporadas en la NBA, donde ganó dos títulos, además de otras tres temporadas en el FC Barcelona. Con 2,13 metros de altura, se desempeñaba como ala-pívot. Considerado por muchos como el mejor jugador de baloncesto español de la historia y uno de los europeos más destacados en la NBA, también es reconocido como uno de los jugadores más influyentes en la historia del baloncesto FIBA. Fue el segundo jugador español en llegar a la NBA, después de Fernando Martín, y logró una serie de hitos importantes, como ser el primer español en disputar un All-Star Game (en Houston 2006), clasificar a un equipo a los playoffs (con los Memphis Grizzlies en la temporada 2003-04) y ganar un campeonato de la NBA, algo que consiguió en dos ocasiones con Los Angeles Lakers (2008-09 y 2009-10). Además, fue el primer jugador no estadounidense en ser galardonado con el premio de Rookie del Año en 2002. ',
      img: 'assets/img/Pau_Gasol.jpg',
      video: '../assets/video/Pau_Gasol.mp4',
    },
    {
      id: 3,
      nombre: 'Marc Gasol',
      num: 33,
      posicion: 'Pivot',
      edad: '39',
      anillos: '1 (2019)',
      descripcion:
        'Marc Gasol Sáez (nacido en Barcelona el 29 de enero de 1985) es un exjugador de baloncesto español que tuvo una carrera profesional de 20 años. Con una altura de 2,11 metros, jugaba como pívot. A lo largo de 13 temporadas consecutivas en la NBA, acumuló una impresionante lista de logros. Entre sus mayores éxitos destaca el campeonato de la NBA que consiguió con los Toronto Raptors el 13 de junio de 2019. También fue nombrado Mejor Defensor de la NBA en 2013 y seleccionado para el mejor quinteto de la liga en 2015. Además, participó en el All-Star Game en tres ocasiones (2012, 2015 y 2017) y rompió numerosos récords con su primer equipo en la NBA, los Memphis Grizzlies. Tras cerrar su paso por la liga jugando con Los Angeles Lakers, Marc dejó la NBA habiendo disputado un total de 990 partidos entre temporada regular y playoffs, representando a tres franquicias distintas.​ ',
      img: 'assets/img/Marc_Gasol.jpg',
      video: '../assets/video/Marc_Gasol.mp4',
    },
    {
      id: 4,
      nombre: 'LeBron James',
      num: 33,
      posicion: 'Alero',
      edad: '39',
      anillos: false,
      descripcion:
        "LeBron James (Akron, Ohio; 30 de diciembre de 1984) es uno de los jugadores más importantes en la historia del baloncesto. Actualmente, juega en Los Angeles Lakers en la NBA, y con su imponente físico de 2,06 metros de altura y 113 kilos, se desempeña principalmente como alero, aunque su versatilidad le permite jugar en varias posiciones. Desde su debut en 2003, LeBron ha sido una fuerza dominante en la liga. James es ampliamente considerado uno de los mejores jugadores de todos los tiempos, gracias a su habilidad para anotar, pasar, defender y liderar a sus equipos. A lo largo de su carrera, ha ganado cuatro campeonatos de la NBA (2012, 2013, 2016 y 2020), cuatro premios MVP de la liga y ha sido seleccionado en 19 ocasiones para el All-Star Game. Ha jugado para tres franquicias: Cleveland Cavaliers, Miami Heat y Los Angeles Lakers, y en cada una de ellas ha dejado su huella con campeonatos y logros históricos. Además de su éxito en la NBA, LeBron ha representado a Estados Unidos en los Juegos Olímpicos, consiguiendo dos medallas de oro (2008 y 2012) y una de bronce (2004). Fuera de la cancha, es conocido por su activismo social y sus iniciativas benéficas, incluida la fundación de la escuela -I PROMISE- en Akron para jóvenes de su comunidad. LeBron James ha sido una figura clave tanto en el deporte como en la sociedad, usando su plataforma para influir positivamente en el mundo del deporte y más allá.",
      img: 'assets/img/LeBron_James.jpg',
      video: '../assets/video/LeBron_James.mp4',
    },
    {
      id: 5,
      nombre: 'Ricky Rubio',
      num: 9,
      posicion: 'Base',
      edad: '33',
      anillos: false,
      descripcion:
        "Ricard 'Ricky' Rubio Vives, nacido el 21 de octubre de 1990 en Masnou, Barcelona, es un jugador de baloncesto español que actualmente juega para el FC Barcelona en la Liga ACB y la Euroliga. Con una estatura de 1,88 metros, su posición natural es la de base. Destaca por ser un excelente jugador de equipo, gracias a su capacidad para distribuir asistencias y crear oportunidades para que sus compañeros encesten. Aunque el tiro en suspensión ha sido históricamente uno de sus puntos más débiles (en 2015, un periódico local de Minnesota lo catalogó como uno de los tiradores menos fiables de la NBA), Rubio ha trabajado en mejorar sus estadísticas y, durante los playoffs, ha logrado superar un promedio de 15 puntos por partido.",
      img: 'assets/img/RickyRubio.jpg',
      video: '/assets/video/RickyRubio.mp4',
    },
  ];

  newPlayer: any = {};

  addPlayer() {
    this.players.push(this.newPlayer);
    this.newPlayer = {};
  }

  getPlayers() {
    return this.players;
  }

  getPlayerById(id: number) {
    return this.players.find((player) => player.id === id);
  }

  updatePlayer(index: number, updatedPlayer: any) {
    this.players[index] = updatedPlayer;
  }

  deletePlayer(index: number) {
    this.players.splice(index, 1);
  }
}
