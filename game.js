// game.js

const canvas = document.getElementById('mapCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;
/*
document.addEventListener('DOMContentLoaded', () => {
  const introOverlay = document.getElementById('intro-overlay');
  const introVideo = document.getElementById('intro-video');
  
  introVideo.onended = () => {
    introOverlay.style.display = 'none';
  };
});
*/

document.addEventListener('DOMContentLoaded', () => {
  const introOverlay = document.getElementById('intro-overlay');
  const introVideo = document.getElementById('intro-video');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  const startMessage = document.getElementById('start-message');
  const introMusic = document.getElementById('intro-music');
  const gameMusic = document.getElementById('game-music');
  
  // Флаг для отслеживания запуска музыки
  let musicStarted = false;

//const messages = document.getElementById('messages');
//const defaultBackground = 'url("images/messages-background.jpg")'; // Путь к дефолтному фону


//----------------


//--------------------------------------------


  // Запуск анимации прогресс-бара
  setTimeout(() => {
    progressFill.style.width = '100%';
  }, 100);

  // Обновление текста процентов
  let percent = 0;
  const interval = setInterval(() => {
    percent += 1;
    progressText.textContent = `${percent}%`;
    if (percent === 100) {
      clearInterval(interval);
      showStartMessage(); // Показ сообщения после 100%
    }
  }, 40);

  // Показ мигающей надписи "PRESS SPACE TO START"
  function showStartMessage() {
    startMessage.classList.add('visible');
  }

  // Запуск игры по нажатию пробела
  function startGame(event) {
    if (event.code === 'Space') {
      // Воспроизведение музыки заставки после первого взаимодействия
      if (!musicStarted) {
        introMusic.play();
        musicStarted = true;
      } else {
        introOverlay.style.display = 'none';
        introMusic.pause();  // Останавливаем музыку заставки
        gameMusic.play();    // Воспроизводим музыку для игры
        document.removeEventListener('keydown', startGame);
      }
    }
  }

  // Настройка видео на повтор 10 раз
  let videoRepeatCount = 0;
  introVideo.onended = () => {
    if (videoRepeatCount < 9) { // Повторяем 10 раз
      introVideo.play();
      videoRepeatCount++;
    } else {
      showStartMessage(); // Показываем сообщение после 10 повторений
    }
  };

  // Показ сообщения после 4 секунд, если видео короче
  setTimeout(showStartMessage, 4000);

  // Добавляем обработчик события для запуска игры
  document.addEventListener('keydown', startGame);
});






// Настройки персонажа
let player = { x: 300, y: 200, size: 80, speed: 15, imageSrc: 'images/player.png' };
const playerImage = new Image();
playerImage.src = player.imageSrc;

// Лабиринтные стены
const wallWidth = 20;
const walls = [
  //{ x1: 70, y1: 50, x2: 600, y2: 50 },
 // { x1: 600, y1: 50, x2: 600, y2: 600 },
  //{ x1: 50, y1: 600, x2: 600, y2: 600 },
  //{ x1: 50, y1: 50, x2: 50, y2: 600 },
 // { x1: 100, y1: 100, x2: 500, y2: 100 },
 // { x1: 500, y1: 100, x2: 500, y2: 400 },
 // { x1: 100, y1: 300, x2: 400, y2: 300 },
  //{ x1: 250, y1: 400, x2: 250, y2: 550 },
 // { x1: 100, y1: 500, x2: 500, y2: 500 }
];

// Цвет и прозрачность стен
const wallColor = 'red';
const wallOpacity = 0.99; // Уровень прозрачности от 0 (полностью прозрачный) до 1 (полностью непрозрачный)

function drawWalls() {
    ctx.strokeStyle = wallColor;
    ctx.lineWidth = 5; // Толщина стен
    ctx.globalAlpha = wallOpacity; // Устанавливаем прозрачность

    walls.forEach(wall => {
        ctx.beginPath();
        ctx.moveTo(wall.x1, wall.y1);
        ctx.lineTo(wall.x2, wall.y2);
        ctx.stroke();
    });

    ctx.globalAlpha = 1.0; // Сбрасываем прозрачность для последующих отрисовок
}

// Зоны с описанием и статусом активности
const zones = [
  {
    x: 45, y: 20, size: 140,
    description: `
 <h2>Positive Technologies</h2>
 <h3>Product Owner</h3>
 
 <h3>Управление продуктами: PT Black Box, PT Application Inspector.</h3>

 <h3>Для обоих продуктов:</h3>

<li>Разработка стратегии продукта, его позиционирования и тактического плана реализации</li>
<li>Формирование и управление бэклогом на основе бизнес-целей и пользовательских потребностей</li>
<li>Проведение исследований рынка и анализа конкурентов для выявления новых возможностей</li>
<li>Координация работы команд разработки, DevSecOps для интеграции решений как в компаниях клиентов, так и внутри</li>
<li>Участие в создании Roadmap для вывода новых фичей и улучшения существующего функционала</li>
<li>Взаимодействие с ключевыми заказчиками для сбора требований и получения обратной связи</li>
<li>Проведение демо-презентаций продукта для внутренней и внешней аудитории</li>
<li>Построение долгосрочных планов развития продукта, внедрение инноваций и решений</li>
<li>Сотрудничество с командой маркетинга для формирования предложений и целевых кампаний</li>
<li>Управление приоритетами и выстраивание гибких процессов для своевременных релизов</li>
<li>Для PT Black Box рост продаж на 200%, а также продление всех текущих клиентов за счёт реализации ключевого функционала в продукте</li> 

<li>Обновление и перезепуск облачного сканера уязвимостей</li>
	  
      <p></p>`,
	  active: false,
    //imgSrc: 'images/zone1.png',
    background: 'url("images/zone1.gif")' // Фон для messages
  },
  {
    x: 426, y: 250, size: 140,
    description: `
 <h2>ИМПЭКС ЭЛЕКТРО</h2>
 <h3>Ведущий специалист по Автоматизированным Системам Управления</h3>
 <li>Разработка проектов для для АСУ ТП</li>
 <li>Сбор и анализ данных от Заказчика</li>
 <li>Написание задания для разработки (ТЗ)</li>
 <li>Управление проектами по разработке систем для АСУ ТП (рабочие группы программистов от 2 до 8 человек)</li>
 <li>Управление проектами по разработке принципиальных схем НКУ (рабочие группы проектировщиков от 2 до 4 человек)</li>
 <li>Разработка и внедрение новых технических решений</li>
 <li>Переговоры с Заказчиком, техническое сопровождение проектов</li>
 <li>Переговоры с поставщиками оборудования для автоматизации</li>
 <li>Работа с подрядными организациями в рамках монтажных и пусконаладочных работ</li>
 <p></p>`,
    active: false,
    imgSrc: 'images/zone12.png'
  },
  {
    x: 410, y: 20, size: 140,
    description: `
<h2>ИНГОССТРАХ</h2>
<h3>Product Owner</h3>
<ol>
<li>Реализация нового сайта в качестве CPO/PM (5 продуктовых команд + 1 платформенная команда, работа по SAFe, в SCRUM)</li>
<li>Определение ключевых критериев успешности сайта (метрик), сайта, как продукта на короткой, средней и длинной дистанции</li>
<li>По факту реализации: увеличение скорости загрузки сайта, рост MAU, увеличение среднего чека, увеличение сборов, оптимизация клиентских путей (CJM) и увеличение конверсий онлайн продуктов. Также сокращение Time to Market для реализации онлайн продуктов и сервисов</li>
</ol>
<h3>PO в end-to-end продуктовой команде в трёх линия бизнеса одновременно:</h3>
<ol>
<li>Страхование жизни. Реализация калькулятора Страхование от несчастного случая (MAU 30 тыс). По итогам реализации - лучший онлайн продукт в сегменте по скорости оформления и качеству клиентского пути. Относительно старого сайта увеличение сборов на 25% и конверсии на 30%</li>
<li>Страхование путешествующих. Линия бизнеса поручена для повышения конверсии и снижения убыточности продуктов:</li>
<li>Страхование путешествующих за границу (MAU = 25 тыс)</li>
<li>Страхование для путешествий по России (MAU = 15 тыс)</li>
<li>Страхование от невыезда (MAU = 2 тыс)</li>
<li>Убыточность бизнес направления снижена на 10%</li>
<li>Увеличена на 12% конверсия от взаимодействия с продуктом в переход на оплату</li>
      </ol>
<h3>Авторизация/регистрация.</h3> 
Реализована авторизация и регистрация на сайте по телефону и пин-коду, логину и паролю, а также возможность авторизации через ГосУслуги. За счёт оптимизации логики создания учётной записи, а также за счёт оптимизации CJM, на 50% увеличена конверсия в онбординг

<h3>По каждому продукту производилось:</h3>
<li>Отслеживание метрик продукта (retention, ARPU, LTV, DAU/MAU, конверсия на всех этапах воронки)</li>
<li>Проведение глубинных интервью с пользователями (UX исследования)</li>
<li>Формирование и приоритезация бэклога гипотез</li>
<li>Проектирование CJM продукта на основе данных</li>
<li>Проведение А/В тестов, подведение итогов, формирование выводов</li>
<li>Формирование видения развития продукта и roadmap на ближайшие 3-4 спринта (квартал-полугодие)</li>
<li>Определение критериев приёмки по каждой EPIC\Feature\Story</li>
<li>Для новых продуктов формирование scope, определение MVP совместно с CPO\PO, c учетом имеющихся ограничений ресурсов и последовательного развития продукта</li>
      <p></p>`,
    active: false,
    imgSrc: 'images/zone3.png'
  },
  {
    x: 48, y: 250, size: 140,
    description: `
<h2>МНПП АНТРАКС</h2>
<h3>Руководитель отдела разработки ПО / Product owner</h3>
<li>Создание системы мониторинга на базе CRM для приборов</li>
<li>Рефакторинг решения и добавление функциональности</li>
<li>Реализация формирование и отображение повреждённого участка линии электропередачи</li>
<li>Увеличение числа пользователей на 50%</li>
<li>Повышение эффективности работы системы на 100%</li>
<li>Интеграция с DJI и создание модуля мониторинга линий электропередач с помощью дронов</li>
<li>Реализация модуля предиктивной диагностики электросетей на основе всех архивных данных от всех приборов, разработанных компанией</li>
<li>Программно-технический комплекс FLISR</li>

<h3>По каждому продукту производилось:</h3>
<li>Разработка требований к продукту: road mapping, storry mapping, формирование scope MVP, декомпозиция EPIC -> Feature -> Story</li>
<li>Участие в приоритезации backlog</li>
<li>Формирование гипотез о продукте, оценка влияния на ключевые метрики</li>
<li>Проведение CustDev (интервью)</li>
<li>Тестирование гипотез</li>
<li>UX-исследования</li>
<li>Найм, онбординг и адаптация, перформанс-ревью и грейдирование, обучение и развитие разработчиков в зависимости от направления</li>

      <p></p>`,
    active: false,
    imgSrc: 'images/zone14.png'
  }
];

let currentZone = null;
const messages = document.getElementById('messages');

// Проверка нажатия клавиш
document.addEventListener('keydown', (e) => {
  movePlayer(e.key);
  if (e.key === ' ') toggleDescription();
  draw();
});

// Передвижение по лабиринту
function movePlayer(direction) {
  let oldX = player.x;
  let oldY = player.y;

  // Передвижение персонажа
  if (direction === 'ArrowUp' && player.y > 0) player.y -= player.speed;
  if (direction === 'ArrowDown' && player.y + player.size < canvas.height) player.y += player.speed;
  if (direction === 'ArrowLeft' && player.x > 0) player.x -= player.speed;
  if (direction === 'ArrowRight' && player.x + player.size < canvas.width) player.x += player.speed;

  // Проверка на столкновение со стенами
  if (isCollidingWithWall()) {
    player.x = oldX;
    player.y = oldY;
  }
}

// Проверка столкновения со стенами лабиринта
function isCollidingWithWall() {
  return walls.some(wall => {
    const withinX = player.x + player.size > Math.min(wall.x1, wall.x2) && player.x < Math.max(wall.x1, wall.x2);
    const withinY = player.y + player.size > Math.min(wall.y1, wall.y2) && player.y < Math.max(wall.y1, wall.y2);
    const collidingHorizontally = withinX && Math.abs(player.y - wall.y1) < wallWidth;
    const collidingVertically = withinY && Math.abs(player.x - wall.x1) < wallWidth;
    return collidingHorizontally || collidingVertically;
  });
}

// Отображение/скрытие описания при входе и выходе из зоны
function toggleDescription() {
  const zone = zones.find(z => isInZone(player, z));
  if (zone) {
    if (zone !== currentZone) {
      messages.innerHTML = zone.description; // Устанавливаем HTML-описание зоны
      currentZone = zone;
      zones.forEach(z => z.active = z === currentZone);
    }
  } else {
    messages.innerHTML = "<p>Вы не в зоне опыта.</p>";
    currentZone = null;
    zones.forEach(z => z.active = false);
  }
}

// Проверка, находится ли игрок в зоне
function isInZone(player, zone) {
  return (
    player.x > zone.x &&
    player.x < zone.x + zone.size &&
    player.y > zone.y &&
    player.y < zone.y + zone.size
  );
}

// Отрисовка зон с изображениями
function drawZones() {
  zones.forEach(zone => {
    const zoneImage = new Image();
    zoneImage.src = zone.imgSrc;
    ctx.drawImage(zoneImage, zone.x, zone.y, zone.size, zone.size);
    
    // Активное выделение
    if (zone.active) {
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.strokeRect(zone.x, zone.y, zone.size, zone.size);
    }
  });
}

// Отрисовка лабиринта, зон и персонажа
function draw() {
     ctx.clearRect(0, 0, canvas.width, canvas.height); // Очищаем канвас
    drawWalls(); // Отрисовываем стены
 
 
 // ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Рисуем стены лабиринта
  
  //ctx.strokeStyle = wallColor;
    //ctx.lineWidth = 5; // Толщина стен
  //ctx.strokeStyle = "#000";
  //ctx.lineWidth = wallWidth;
  //walls.forEach(wall => {
    //ctx.beginPath();
    //ctx.moveTo(wall.x1, wall.y1);
    //ctx.lineTo(wall.x2, wall.y2);
    //ctx.stroke();
  //});

  // Рисуем зоны с изображениями
  drawZones();

  // Рисуем персонажа как изображение
  ctx.drawImage(playerImage, player.x, player.y, player.size, player.size);
}

// Начальная отрисовка
draw();
