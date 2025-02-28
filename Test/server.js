const http = require('http'); // Модуль для создания HTTP-сервера
const url = require('url');   // Модуль для разбора URL
const axios = require('axios'); // Библиотека для HTTP-запросов (нужна для погоды)

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true); // Разбираем URL и параметры

  // Маршрут для сложения чисел (/add?a=5&b=3)
  if (parsedUrl.pathname === '/add') {
    const a = parseFloat(parsedUrl.query.a);
    const b = parseFloat(parsedUrl.query.b);
    if (!isNaN(a) && !isNaN(b)) {
      res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end(`Результат: ${a + b}\n`);
    } else {
      res.writeHead(400, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end('Неверные параметры\n');
    }
  } 
  // Маршрут для погоды (/weather)
  else if (parsedUrl.pathname === '/weather') {
    try {
      const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY');
      const weather = response.data.weather[0].description;
      res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end(`Погода в Лондоне: ${weather}\n`);
    } catch (error) {
      res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
      res.end('Ошибка при получении данных о погоде\n');
    }
  } 
  // Главная страница (/)
  else if (parsedUrl.pathname === '/') {
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('Добро пожаловать в мой DevOps-проект!\n');
  } 
  // Маршрут для текущего времени (/time)
  else if (parsedUrl.pathname === '/time') {
    const currentTime = new Date().toLocaleTimeString();
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`Текущее время: ${currentTime}\n`);
  } 
  // Маршрут для случайного числа (/random)
  else if (parsedUrl.pathname === '/random') {
    const randomNumber = Math.floor(Math.random() * 100);
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`Ваше случайное число: ${randomNumber}\n`);
  } 
  // Обработка неизвестных маршрутов
  else {
    res.writeHead(404, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end('Страница не найдена\n');
  }
});

// Запускаем сервер на порту 3000
server.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});