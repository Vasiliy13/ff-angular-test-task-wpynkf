Задание:
Нам нужно показывать в режиме реального времени точное время в Москве и в Киеве. Данные загружаются с одного из публичных серверов и методы загрузки есть в CurrentTimeService. Сервер по запросу возвращает текущее время.
При загрузке страницы в поле Current city отображается город по-умолчанию (Moscow), а также загружается текущее время для москвы с сервера и дальше начинает обновляться каждую секунду. При нажатии на кнопку Switch cities город меняется на Kiev, данные снова загружаются для Киева и обновляются каждые 2 секунды. Если нажать на switch cities, то город снова меняется на москву и в поле Time отображается текущее время для москвы с отображением раз в секунду, но данные с сервера о текущем времени уже соответственно не подгружаются.

Каркас приложения уже готов. Написанные файлы можно менять.