module.exports.sendMsg = (req, res) => {
    //токен и id чата берутся из config.json
    const config = require('../config/config.json');
    let http = require('request')
    let reqBody = req.body
    //каждый элемент обьекта запихиваем в массив
    let fields = [
        '<b>Name</b>: ' + reqBody.name,
        '<b>Email</b>: ' + reqBody.email,
        '<b>Text</b>: ' + reqBody.text,
    ]
    let msg = ''
    //проходимся по массиву и склеиваем все в одну строку
    fields.forEach(field => {
        msg += field + '\n'
    });
    msg += '<b>Host:</b> ' + req.host+'\n';
    //кодируем результат в текст, понятный адресной строке
    msg = encodeURI(msg);
    let successnum = 0;

    for(var i = 0; i < config.telegram.chats.length; i++) {
        //делаем запрос
        http.post(`https://api.telegram.org/bot${config.telegram.token}/sendMessage?chat_id=${config.telegram.chats[i]}&parse_mode=html&text=${msg}`, function (error, response, body) {
            //не забываем обработать ответ
            console.log('error:', error);
            console.log('statusCode:', response && response.statusCode);
            console.log('body:', body);


        });
    }
    res.status(200).json({status: 'ok', message: 'Успешно отправлено!'});
}
