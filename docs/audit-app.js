// Real audit data keyed by hostname
const REAL_AUDITS = {
  "soft-divan.ru": {
    mode: "real",
    auditId: "softdivan-2026-06",
    savedAt: new Date().toISOString(),
    source: { url: "https://soft-divan.ru", mappedUrls: 18, scrapedPages: 6, archiveUrl: "#" },
    score: 38,
    packageName: "Старт",
    scoreBlocks: [
      { label: "Сайт", score: 45 },
      { label: "Контент", score: 30 },
      { label: "GEO", score: 25 },
      { label: "Соцсети", score: 15 },
      { label: "Конверсия", score: 50 },
      { label: "Доверие", score: 44 }
    ],
    findings: [
      { id:"no-prices", category:"Контент", severity:"urgent", num:1,
        title:"В каталоге нет цен",
        loss:"Оптовик не может за 30 секунд понять, выгодно ли работать с вами. Открывает конкурента, у которого прайс виден сразу.",
        summary:"Firecrawl проверил /catalog/pryamye_divany, /catalog/uglovye_divany, /catalog/krovati — у всех позиций цена «р.» без суммы. Партнёр вынужден звонить ради базовой информации.",
        impact:"B2B клиент сравнивает 3–5 поставщиков. Тот, у кого прайс на сайте — выигрывает звонок первым.",
        recommendedAction:"Добавить «от X руб.» к каждой позиции или форму «Запросить прайс → PDF за 5 мин».",
        pageScreenshot:"https://storage.googleapis.com/firecrawl-scrape-media/screenshot-2048c97d-192e-4e06-a452-a3553f43499f.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1782140615&Signature=xNJlZifhjfydCsb06uLLzq1cXxUARED9zc5YbabhPm55URpYmSvYx6ykyTodNwYct9ePt47IFPDI%2BzCpGgwsxgD7Uaj8%2FpezLrY7%2BUO4VxAoIyTlchibWH2WIv0jQX%2BpCcGXC0l06LN8IrdGFF%2FonCmRTOHDaoPHu6K0g4wDA6BE4lAD3yHN5UsTc%2Bt3TCffe1EAk1nbzWJTlQl4XwI4gB%2B8nM7fjkEm0g7w7w1GshSHY%2Bupiyk%2FAYcxxzwK6vYzvL8RBDMsHBFWRZMKOSd378%2FV%2BN0OleCHaaGYINvOfnE0vrMIlQ%2B8ULY5a0OMpgdaIjEVlna%2BM89gDO1%2Fe%2FaLvw%3D%3D",
        pageLabel:"Каталог: прямые диваны → цена «р.»",
        taskId:"task-prices", evidenceIds:["evidence-catalog"], pageUrls:["page-catalog-straight"], score:28 },
      { id:"blog-placeholder", category:"Контент и SEO", severity:"urgent", num:2,
        title:"Блог заполнен английскими заглушками",
        loss:"Яндекс уже проиндексировал «There is a first post headline». Запросы типа «купить диван оптом» не получают этого сайта — их забирают конкуренты с реальным блогом.",
        summary:"Firecrawl нашёл 3 поста: «There is a first post headline», «Title of the second sample post», «The third title for the post» — Tilda-шаблон, не заменённый реальным контентом.",
        impact:"SEO-потери + потеря доверия: если клиент случайно зайдёт в блог — уйдёт сразу.",
        recommendedAction:"Удалить 3 заглушки. Написать: обзор Калипсо, гид по выбору модульного дивана, история производства.",
        pageScreenshot:"https://storage.googleapis.com/firecrawl-scrape-media/screenshot-331173ea-7a5d-491a-bbf4-0d8635058841.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1782140621&Signature=MJbjNU%2BgFvHWMIWWZ1nQ%2FDSIOr7j%2FnrsLuwBT6PpJQ1GNlRopMWlMYTYRrvV%2BInEWTViDvNUm23%2BqSvlm7R%2FHiQjxWtXV4LSQCU71VUSU4vsCvOZY28vERB8EaaQwE%2BoH3RMBWqKMKXnMHKHqIg6AqTdW%2FFvN7y5wl2YTwwEbfJLt1C%2FI7M1jqEbRtSxb83%2Fj2VbDckNhAkGWK%2FPA7%2BFxnS6mGo3Q2if28ofPdrICMlqCvk8Ayy4OLiFe%2BjiXan4CIrJ3MdfuTIeBurcCuKts9ztyylzNT2ts8UtdWrHqWbNKkPlC2Wqwwa2tQWNUGv59oz1A18wrU6uH09MhC7Q%3D%3D",
        pageLabel:"Блог: «There is a first post headline»",
        taskId:"task-blog", evidenceIds:["evidence-blog"], pageUrls:["page-blog"], score:18 },
      { id:"no-geo", category:"GEO и карты", severity:"urgent", num:3,
        title:"Непонятно, где находится производство",
        loss:"Оптовик хочет знать, сколько стоит доставка до его склада. Без города — считает это риском и звонит тем, у кого адрес открыт.",
        summary:"«Крупный производитель по РФ и СНГ» — но ни города, ни адреса, ни региона нет нигде на сайте. Яндекс.Карты и 2ГИС не упоминаются.",
        impact:"В локальном и региональном поиске сайт невидим. Партнёр из Москвы не может оценить логистику.",
        recommendedAction:"Добавить город + адрес в шапку и футер. Зарегистрировать в Яндекс.Бизнес с фото цеха.",
        pageScreenshot:"https://storage.googleapis.com/firecrawl-scrape-media/screenshot-8c745684-2acb-43e2-98ea-2e4c95ceab27.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1782140590&Signature=fRQ99I7QIKU1IhZA8lOrABh%2BtPZOJ5HirAIk65CdL%2BzOgSHRIGdkFRUSZRQ7HEqcB%2FJ406QMywyCrHpaJZoIx8WQnmn%2FCbsmkbxRou%2Fa%2FzewsMzF9oVkdVSyMJCdPRtbgRNDrZpksLT0QeHOJXCyQItzGps0IJjm8DX3q52q%2FA149W27c1iwuKz5XxRMoHZ0dd9l1V5bo0WUWD8PLxaESnzFaD%2BtRWEOAsQ4%2BBxpm7qvZ8Ehp2rWxuJ7nKNN6ekaWigcwyPoAKHKM3qw0pJpz7Xg%2BnHEaYvkMCwkCvOh1PDGmJpoFVYz7xYq18hnwOmNQ6DdhHSB4MOU0gbui56UJQ%3D%3D",
        pageLabel:"Главная — город и адрес не найдены",
        taskId:"task-geo", evidenceIds:["evidence-home"], pageUrls:["page-home"], score:22 },
      { id:"no-social", category:"Соцсети", severity:"urgent", num:4,
        title:"Нет ни одного канала в соцсетях",
        loss:"B2B клиент проверяет поставщика в Telegram или ВК: смотрит фото цеха, читает отзывы в комментариях. Видит пустоту — уходит к тому, у кого канал живой.",
        summary:"Firecrawl не нашёл ни одной ссылки на Telegram, ВКонтакте, WhatsApp, Instagram. Иконок соцсетей на сайте нет вообще.",
        impact:"Компания с 120 партнёрами выглядит как призрак в интернете за пределами своего сайта.",
        recommendedAction:"Создать Telegram-канал @softdivan_mebel. 5 постов на первую неделю: цех, новинки, условия, бэкстейдж, кейс партнёра.",
        pageScreenshot:"https://storage.googleapis.com/firecrawl-scrape-media/screenshot-8c745684-2acb-43e2-98ea-2e4c95ceab27.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1782140590&Signature=fRQ99I7QIKU1IhZA8lOrABh%2BtPZOJ5HirAIk65CdL%2BzOgSHRIGdkFRUSZRQ7HEqcB%2FJ406QMywyCrHpaJZoIx8WQnmn%2FCbsmkbxRou%2Fa%2FzewsMzF9oVkdVSyMJCdPRtbgRNDrZpksLT0QeHOJXCyQItzGps0IJjm8DX3q52q%2FA149W27c1iwuKz5XxRMoHZ0dd9l1V5bo0WUWD8PLxaESnzFaD%2BtRWEOAsQ4%2BBxpm7qvZ8Ehp2rWxuJ7nKNN6ekaWigcwyPoAKHKM3qw0pJpz7Xg%2BnHEaYvkMCwkCvOh1PDGmJpoFVYz7xYq18hnwOmNQ6DdhHSB4MOU0gbui56UJQ%3D%3D",
        pageLabel:"Главная — ноль иконок соцсетей",
        taskId:"task-social", evidenceIds:[], pageUrls:["page-home"], score:10 },
      { id:"single-cta", category:"Конверсия", severity:"important", num:5,
        title:"Все кнопки ведут на одну и ту же форму",
        loss:"Посетитель, которому нужен каталог, нажимает «Подробнее» и видит форму заявки. Не готов — закрывает вкладку. Потенциальный партнёр потерян.",
        summary:"«Подробнее», «Стать партнёром», «Узнать цены» — все 6+ кнопок на главной ведут на один якорь #rec1157278931.",
        impact:"Нет промежуточных шагов для «тёплого» клиента, которому нужен PDF или консультация, а не сразу сделка.",
        recommendedAction:"Разделить CTA: «Скачать каталог» → PDF, «Узнать оптовые цены» → быстрая форма, «Стать партнёром» → страница условий.",
        pageScreenshot:"https://storage.googleapis.com/firecrawl-scrape-media/screenshot-8c745684-2acb-43e2-98ea-2e4c95ceab27.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1782140590&Signature=fRQ99I7QIKU1IhZA8lOrABh%2BtPZOJ5HirAIk65CdL%2BzOgSHRIGdkFRUSZRQ7HEqcB%2FJ406QMywyCrHpaJZoIx8WQnmn%2FCbsmkbxRou%2Fa%2FzewsMzF9oVkdVSyMJCdPRtbgRNDrZpksLT0QeHOJXCyQItzGps0IJjm8DX3q52q%2FA149W27c1iwuKz5XxRMoHZ0dd9l1V5bo0WUWD8PLxaESnzFaD%2BtRWEOAsQ4%2BBxpm7qvZ8Ehp2rWxuJ7nKNN6ekaWigcwyPoAKHKM3qw0pJpz7Xg%2BnHEaYvkMCwkCvOh1PDGmJpoFVYz7xYq18hnwOmNQ6DdhHSB4MOU0gbui56UJQ%3D%3D",
        pageLabel:"Главная — все кнопки → один якорь",
        taskId:"task-cta", evidenceIds:["evidence-home"], pageUrls:["page-home"], score:52 },
      { id:"no-reviews", category:"Доверие", severity:"important", num:6,
        title:"120 партнёров — но нет ни одного живого отзыва",
        loss:"Новый оптовик видит лого woodmann-mebel.ru, но не знает, что именно они сказали бы про работу с SOFT Divan. Конкурент с 10 партнёрами, но с видео-отзывами — убедительнее.",
        summary:"На сайте есть 3 лого партнёров, но нет цитат, имён, описаний. Нет ни одного «нам понравилось, что...».",
        impact:"Социальное доказательство в B2B — главный фактор доверия. Без него 120 партнёров — просто цифра.",
        recommendedAction:"Попросить 3–5 партнёров дать 2–3 предложения + фото салона. Разместить как карусель на главной.",
        pageScreenshot:"https://storage.googleapis.com/firecrawl-scrape-media/screenshot-8c745684-2acb-43e2-98ea-2e4c95ceab27.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1782140590&Signature=fRQ99I7QIKU1IhZA8lOrABh%2BtPZOJ5HirAIk65CdL%2BzOgSHRIGdkFRUSZRQ7HEqcB%2FJ406QMywyCrHpaJZoIx8WQnmn%2FCbsmkbxRou%2Fa%2FzewsMzF9oVkdVSyMJCdPRtbgRNDrZpksLT0QeHOJXCyQItzGps0IJjm8DX3q52q%2FA149W27c1iwuKz5XxRMoHZ0dd9l1V5bo0WUWD8PLxaESnzFaD%2BtRWEOAsQ4%2BBxpm7qvZ8Ehp2rWxuJ7nKNN6ekaWigcwyPoAKHKM3qw0pJpz7Xg%2BnHEaYvkMCwkCvOh1PDGmJpoFVYz7xYq18hnwOmNQ6DdhHSB4MOU0gbui56UJQ%3D%3D",
        pageLabel:"Главная — 3 лого без цитат",
        taskId:"task-reviews", evidenceIds:["evidence-home"], pageUrls:["page-home"], score:40 }
    ],
    tasks: [
      { id:"task-prices", title:"Добавить цены или форму запроса прайса в каталог", status:"В работу", priority:"urgent", owner:"Клиент", deadline:"3 дня",
        expectedEffect:"Убрать главный барьер для оптовика — «нет цены = непонятно».",
        checklist:["Добавить «от X руб.» к каждой позиции","Или форма «Запросить прайс» → PDF на email за 5 мин","Проверить что CTA работает на мобилке"],
        linkedFindingIds:["no-prices"], linkedEvidenceIds:["evidence-catalog"] },
      { id:"task-blog", title:"Заменить заглушки блога реальными статьями", status:"В работу", priority:"urgent", owner:"Исполнитель", deadline:"7 дней",
        expectedEffect:"Убрать убивающий доверие placeholder-контент, начать собирать SEO-трафик.",
        checklist:["Удалить 3 шаблонные записи","Написать «Обзор коллекции Калипсо: чем отличается от конкурентов»","Написать «Как выбрать модульный диван для вашего салона»","Написать «SOFT Divan: от цеха до партнёра — как мы работаем»"],
        linkedFindingIds:["blog-placeholder"], linkedEvidenceIds:["evidence-blog"] },
      { id:"task-geo", title:"Добавить географию и карточку в Яндекс/2ГИС", status:"Запланировано", priority:"urgent", owner:"Клиент", deadline:"7 дней",
        expectedEffect:"Клиент сразу понимает, где производство и сколько стоит доставка.",
        checklist:["Добавить город + адрес в футер и страницу контактов","Зарегистрировать производство в Яндекс.Бизнес","Загрузить 10+ фото цеха","Указать регионы доставки на главной"],
        linkedFindingIds:["no-geo"], linkedEvidenceIds:[] },
      { id:"task-social", title:"Запустить Telegram-канал производителя", status:"Запланировано", priority:"urgent", owner:"Исполнитель + клиент", deadline:"14 дней",
        expectedEffect:"B2B клиент видит живое производство, убеждается в надёжности.",
        checklist:["Создать канал @softdivan_mebel","Написать приветственный пост о производстве","5 постов на первую неделю: цех, новинки, условия, кейс партнёра","Добавить ссылку на канал на сайт"],
        linkedFindingIds:["no-social"], linkedEvidenceIds:[] },
      { id:"task-cta", title:"Разделить CTA по намерениям посетителя", status:"Запланировано", priority:"important", owner:"Исполнитель", deadline:"14 дней",
        expectedEffect:"Снизить потерю «тёплых» посетителей, которые не готовы к заявке сразу.",
        checklist:["«Скачать каталог» → PDF без формы","«Узнать оптовые цены» → быстрая форма","«Стать партнёром» → страница с условиями"],
        linkedFindingIds:["single-cta"], linkedEvidenceIds:["evidence-home"] },
      { id:"task-reviews", title:"Собрать реальные отзывы от 3–5 партнёров", status:"Запланировано", priority:"important", owner:"Клиент", deadline:"21 день",
        expectedEffect:"Превратить «120 партнёров» из цифры в живое доказательство надёжности.",
        checklist:["Написать 5 партнёрам из базы","Попросить 2–3 предложения + фото","Разместить на главной как карусель"],
        linkedFindingIds:["no-reviews"], linkedEvidenceIds:[] }
    ],
    pages: [
      { id:"page-home", type:"home", title:"Главная — SOFT Divan", url:"https://soft-divan.ru", description:"Производитель мягкой мебели B2B, коллекция Калипсо, форма партнёрства", statusCode:200, screenshot:"https://storage.googleapis.com/firecrawl-scrape-media/screenshot-8c745684-2acb-43e2-98ea-2e4c95ceab27.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1782140590&Signature=fRQ99I7QIKU1IhZA8lOrABh%2BtPZOJ5HirAIk65CdL%2BzOgSHRIGdkFRUSZRQ7HEqcB%2FJ406QMywyCrHpaJZoIx8WQnmn%2FCbsmkbxRou%2Fa%2FzewsMzF9oVkdVSyMJCdPRtbgRNDrZpksLT0QeHOJXCyQItzGps0IJjm8DX3q52q%2FA149W27c1iwuKz5XxRMoHZ0dd9l1V5bo0WUWD8PLxaESnzFaD%2BtRWEOAsQ4%2BBxpm7qvZ8Ehp2rWxuJ7nKNN6ekaWigcwyPoAKHKM3qw0pJpz7Xg%2BnHEaYvkMCwkCvOh1PDGmJpoFVYz7xYq18hnwOmNQ6DdhHSB4MOU0gbui56UJQ%3D%3D", signals:{ hasCta:true, hasPhone:false, imageCount:8, linkCount:18 }, excerpt:"Крупный производитель для вашего мебельного бизнеса. 120+ партнёров, 2500+ изделий, срок производства 7 дней." },
      { id:"page-catalog-straight", type:"catalog", title:"Прямые диваны — каталог", url:"https://soft-divan.ru/catalog/pryamye_divany", description:"Диваны Калипсо 2х/3х-модульный, Берг, Мини — прямые модели", statusCode:200, screenshot:"https://storage.googleapis.com/firecrawl-scrape-media/screenshot-2048c97d-192e-4e06-a452-a3553f43499f.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1782140615&Signature=xNJlZifhjfydCsb06uLLzq1cXxUARED9zc5YbabhPm55URpYmSvYx6ykyTodNwYct9ePt47IFPDI%2BzCpGgwsxgD7Uaj8%2FpezLrY7%2BUO4VxAoIyTlchibWH2WIv0jQX%2BpCcGXC0l06LN8IrdGFF%2FonCmRTOHDaoPHu6K0g4wDA6BE4lAD3yHN5UsTc%2Bt3TCffe1EAk1nbzWJTlQl4XwI4gB%2B8nM7fjkEm0g7w7w1GshSHY%2Bupiyk%2FAYcxxzwK6vYzvL8RBDMsHBFWRZMKOSd378%2FV%2BN0OleCHaaGYINvOfnE0vrMIlQ%2B8ULY5a0OMpgdaIjEVlna%2BM89gDO1%2Fe%2FaLvw%3D%3D", signals:{ hasCta:false, hasPhone:false, imageCount:12, linkCount:10 }, excerpt:"Кресло «Калипсо», Диван «Калипсо» 2х/3х-модульный. Размеры указаны, цены скрыты." },
      { id:"page-catalog-angular", type:"catalog", title:"Угловые диваны — каталог", url:"https://soft-divan.ru/catalog/uglovye_divany", description:"Спейс, Прага, Грейс, Чикаго — угловые модели", statusCode:200, screenshot:"https://storage.googleapis.com/firecrawl-scrape-media/screenshot-7d93aeb9-4949-4b28-b3bd-6073ea7143a4.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1782140610&Signature=yNl%2BiYjT6is63ddbbl%2FiQg3Xvw4zm6GHmZwve1mnna1yHUKEjU1cUeO4CI7XSFz7Am4cZvkhg4ZLF6CEhmCjgD8lre1IMnLqGnhEnvZ14L7y%2F0LZucxKRZliDUf9T2P0pseJEMI93zqIeCBOG1sJ%2BnCzhF1QNhVSJ3SIe7XQv7SZOKUpP5KO50rtEkOH3e6Xp5DUZrJGOR5x8lj2F7t5QwaaqNlCr7ksIeObwatJgFGFM5PepOY%2F%2BFnb7aLqZGLoCqv1xp83g0tKWDvs9EURKjBhwE1aYAXJWYDuhIF61%2BUXfwtRjk1kXu8H8NrVm1e3tbM0lHXNmg0H%2Fdg6ojPUZw%3D%3D", signals:{ hasCta:false, hasPhone:false, imageCount:10, linkCount:8 }, excerpt:"Диван «Спейс» (Хит) 2700×1480, Прага, Грейс. Нет цен, нет сортировки." },
      { id:"page-beds", type:"catalog", title:"Мягкие кровати — каталог", url:"https://soft-divan.ru/catalog/krovati", description:"Кровати с подъёмным механизмом: Хеппи, Леона Лофт, Марлен Лофт", statusCode:200, screenshot:"", signals:{ hasCta:false, hasPhone:false, imageCount:6, linkCount:6 }, excerpt:"Кровати в стиле Лофт 1400/1600 мм. Нет цен, изображения static (не optim) — загружаются медленнее." },
      { id:"page-blog", type:"blog", title:"Блог — SOFT Divan", url:"https://soft-divan.ru/tpost/nsoiyca9t1-there-is-a-first-post-headline", description:"3 поста-заглушки на английском языке", statusCode:200, screenshot:"https://storage.googleapis.com/firecrawl-scrape-media/screenshot-331173ea-7a5d-491a-bbf4-0d8635058841.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1782140621&Signature=MJbjNU%2BgFvHWMIWWZ1nQ%2FDSIOr7j%2FnrsLuwBT6PpJQ1GNlRopMWlMYTYRrvV%2BInEWTViDvNUm23%2BqSvlm7R%2FHiQjxWtXV4LSQCU71VUSU4vsCvOZY28vERB8EaaQwE%2BoH3RMBWqKMKXnMHKHqIg6AqTdW%2FFvN7y5wl2YTwwEbfJLt1C%2FI7M1jqEbRtSxb83%2Fj2VbDckNhAkGWK%2FPA7%2BFxnS6mGo3Q2if28ofPdrICMlqCvk8Ayy4OLiFe%2BjiXan4CIrJ3MdfuTIeBurcCuKts9ztyylzNT2ts8UtdWrHqWbNKkPlC2Wqwwa2tQWNUGv59oz1A18wrU6uH09MhC7Q%3D%3D", signals:{ hasCta:false, hasPhone:false, imageCount:0, linkCount:3 }, excerpt:"«There is a first post headline» — Tilda-шаблон, не заменён реальным контентом." }
    ],
    evidence: [
      { id:"evidence-home", pageId:"page-home", pageType:"home", title:"Главная страница", url:"https://soft-divan.ru", screenshot:"https://storage.googleapis.com/firecrawl-scrape-media/screenshot-8c745684-2acb-43e2-98ea-2e4c95ceab27.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1782140590&Signature=fRQ99I7QIKU1IhZA8lOrABh%2BtPZOJ5HirAIk65CdL%2BzOgSHRIGdkFRUSZRQ7HEqcB%2FJ406QMywyCrHpaJZoIx8WQnmn%2FCbsmkbxRou%2Fa%2FzewsMzF9oVkdVSyMJCdPRtbgRNDrZpksLT0QeHOJXCyQItzGps0IJjm8DX3q52q%2FA149W27c1iwuKz5XxRMoHZ0dd9l1V5bo0WUWD8PLxaESnzFaD%2BtRWEOAsQ4%2BBxpm7qvZ8Ehp2rWxuJ7nKNN6ekaWigcwyPoAKHKM3qw0pJpz7Xg%2BnHEaYvkMCwkCvOh1PDGmJpoFVYz7xYq18hnwOmNQ6DdhHSB4MOU0gbui56UJQ%3D%3D", statusCode:200, imagesFound:8, excerpt:"Нет цен, нет города, нет соцсетей. CTA «Стать партнёром» — одна кнопка для всех намерений." },
      { id:"evidence-catalog", pageId:"page-catalog-straight", pageType:"catalog", title:"Каталог прямых диванов", url:"https://soft-divan.ru/catalog/pryamye_divany", screenshot:"https://storage.googleapis.com/firecrawl-scrape-media/screenshot-2048c97d-192e-4e06-a452-a3553f43499f.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1782140615&Signature=xNJlZifhjfydCsb06uLLzq1cXxUARED9zc5YbabhPm55URpYmSvYx6ykyTodNwYct9ePt47IFPDI%2BzCpGgwsxgD7Uaj8%2FpezLrY7%2BUO4VxAoIyTlchibWH2WIv0jQX%2BpCcGXC0l06LN8IrdGFF%2FonCmRTOHDaoPHu6K0g4wDA6BE4lAD3yHN5UsTc%2Bt3TCffe1EAk1nbzWJTlQl4XwI4gB%2B8nM7fjkEm0g7w7w1GshSHY%2Bupiyk%2FAYcxxzwK6vYzvL8RBDMsHBFWRZMKOSd378%2FV%2BN0OleCHaaGYINvOfnE0vrMIlQ%2B8ULY5a0OMpgdaIjEVlna%2BM89gDO1%2Fe%2FaLvw%3D%3D", statusCode:200, imagesFound:12, excerpt:"Диван «Калипсо» 2х-модульный — Прямой 1800×850 — «р.» (цена пустая). Аналогично у всех 8 позиций." },
      { id:"evidence-blog", pageId:"page-blog", pageType:"blog", title:"Блог (заглушка)", url:"https://soft-divan.ru/tpost/nsoiyca9t1-there-is-a-first-post-headline", screenshot:"https://storage.googleapis.com/firecrawl-scrape-media/screenshot-331173ea-7a5d-491a-bbf4-0d8635058841.png?GoogleAccessId=scrape-bucket-accessor%40firecrawl.iam.gserviceaccount.com&Expires=1782140621&Signature=MJbjNU%2BgFvHWMIWWZ1nQ%2FDSIOr7j%2FnrsLuwBT6PpJQ1GNlRopMWlMYTYRrvV%2BInEWTViDvNUm23%2BqSvlm7R%2FHiQjxWtXV4LSQCU71VUSU4vsCvOZY28vERB8EaaQwE%2BoH3RMBWqKMKXnMHKHqIg6AqTdW%2FFvN7y5wl2YTwwEbfJLt1C%2FI7M1jqEbRtSxb83%2Fj2VbDckNhAkGWK%2FPA7%2BFxnS6mGo3Q2if28ofPdrICMlqCvk8Ayy4OLiFe%2BjiXan4CIrJ3MdfuTIeBurcCuKts9ztyylzNT2ts8UtdWrHqWbNKkPlC2Wqwwa2tQWNUGv59oz1A18wrU6uH09MhC7Q%3D%3D", statusCode:200, imagesFound:0, excerpt:"«There is a first post headline» — Tilda placeholder, не заменён после публикации. SEO-вред." }
    ],
    plan: [
      { period:"3–7 дней", title:"Убрать главные барьеры конверсии", taskIds:["task-prices","task-blog","task-geo"] },
      { period:"2 недели", title:"Добавить канал и разделить CTA", taskIds:["task-social","task-cta"] },
      { period:"3–4 недели", title:"Социальные доказательства", taskIds:["task-reviews"] }
    ]
  }
};

const fallbackFindings = [
  {
    id: "offer",
    category: "Сайт и оффер",
    severity: "urgent",
    title: "Оффер не объясняет, почему выбрать вас",
    summary: "На первом экране мало конкретики: нет понятного сегмента, результата, сроков и сильного отличия.",
    impact: "Клиент сравнивает вас по цене, а не по ценности.",
    evidenceIds: [],
    pageUrls: [],
    recommendedAction: "Пересобрать первый экран: сегмент, выгода, доказательства, CTA.",
    taskId: "task-offer"
  }
];

const fallbackTasks = [
  {
    id: "task-offer",
    title: "Пересобрать первый экран сайта",
    status: "В работу",
    priority: "urgent",
    owner: "Исполнитель",
    deadline: "7 дней",
    expectedEffect: "Уменьшить потерю заявок с главной страницы.",
    checklist: ["Проверить скрин главной", "Сформулировать оффер", "Добавить CTA"],
    linkedFindingIds: ["offer"],
    linkedEvidenceIds: []
  }
];

let currentAudit = {
  score: 64,
  packageName: "Рост",
  source: { mappedUrls: 0, scrapedPages: 0 },
  pages: [],
  findings: fallbackFindings,
  tasks: fallbackTasks,
  evidence: [],
  plan: [{ period: "7 дней", title: "Закрыть базовые потери", taskIds: ["task-offer"] }],
  scoreBlocks: []
};
let activePageFilter = "all";

const analytics = [
  { channel: "Сайт", reach: "1 240", leads: "12", trend: "+18%", bars: [28, 34, 42, 50, 58, 64, 76] },
  { channel: "Telegram", reach: "3 860", leads: "9", trend: "+31%", bars: [30, 38, 35, 48, 62, 74, 80] },
  { channel: "VK", reach: "2 140", leads: "5", trend: "+12%", bars: [24, 28, 32, 40, 47, 51, 57] },
  { channel: "Карты", reach: "8 300", leads: "18", trend: "+24%", bars: [44, 48, 54, 60, 63, 70, 84] }
];

const form = document.querySelector("#auditForm");
const registrationForm = document.querySelector("#registrationForm");
const registrationScreen = document.querySelector("#registrationScreen");
const appShell = document.querySelector("#appShell");
const auditGrid = document.querySelector("#auditGrid");
const timeline = document.querySelector("#timeline");
const auditPlan = document.querySelector("#auditPlan");
const analyticsGrid = document.querySelector("#analyticsGrid");
const expertMode = document.querySelector("#expertMode");
const logoutButton = document.querySelector("#logoutButton");
const botStatus = document.querySelector("#botStatus");
const botMessage = document.querySelector("#botMessage");
const scoreValue = document.querySelector("#scoreValue");
const scoreLabel = document.querySelector("#scoreLabel");
const issueCount = document.querySelector("#issueCount");
const packageName = document.querySelector("#packageName");
const clientAccessLabel = document.querySelector("#clientAccessLabel");
const crawlStatus = document.querySelector("#crawlStatus");
const processGrid = document.querySelector("#processGrid");
const evidenceBand = document.querySelector("#evidenceBand");
const evidenceGrid = document.querySelector("#evidenceGrid");
const auditArchiveLink = document.querySelector("#auditArchiveLink");
const pagesGrid = document.querySelector("#pagesGrid");
const tasksList = document.querySelector("#tasksList");
const drawer = document.querySelector("#taskDrawer");
const drawerContent = document.querySelector("#drawerContent");
const drawerClose = document.querySelector("#drawerClose");
let expertLayerEnabled = false;
const storageKey = "marketing-os-demo-client";

function priorityClass(priority) {
  return priority === "urgent" ? "urgent" : priority === "important" ? "important" : "later";
}

function severityLabel(priority) {
  return priority === "urgent" ? "Срочно" : priority === "important" ? "Важно" : "Потом";
}

function pageTypeLabel(type) {
  return { home: "Главная", services: "Услуги", contacts: "Контакты", cases: "Кейсы", blog: "Блог" }[type] || "Прочее";
}

function byId(list, id) {
  return (list || []).find((item) => item.id === id);
}

function normalizeAudit(payload) {
  if (!payload) return currentAudit;
  if (Array.isArray(payload.findings) && Array.isArray(payload.tasks)) return payload;

  const evidence = payload.evidence || [];
  const findings = (payload.issues || []).map((issue, index) => ({
    id: issue.key || `finding-${index + 1}`,
    category: issue.key === "seo" ? "SEO" : issue.key === "geo" ? "GEO" : issue.key === "contacts" ? "Контакты и заявки" : "Сайт",
    severity: issue.score < 55 ? "urgent" : issue.score < 70 ? "important" : "later",
    title: issue.problem || "Вывод аудита",
    summary: issue.problem || "Нужно проверить вручную.",
    impact: "Влияет на понятность сайта, доверие и путь заявки.",
    evidenceIds: evidence.slice(0, 2).map((item) => item.id).filter(Boolean),
    pageUrls: [],
    recommendedAction: issue.action || "Добавить задачу в работу.",
    taskId: `task-${issue.key || index + 1}`,
    score: issue.score || 50
  }));
  const tasks = findings.map((finding, index) => ({
    id: finding.taskId,
    title: finding.recommendedAction,
    status: index < 2 ? "В работу" : "Запланировано",
    priority: finding.severity,
    owner: finding.id === "contacts" ? "Клиент + система" : "Исполнитель",
    deadline: index < 2 ? "7 дней" : index < 4 ? "14 дней" : "30 дней",
    expectedEffect: finding.impact,
    checklist: ["Открыть доказательства", "Согласовать правку", "Внести изменение", "Проверить результат"],
    linkedFindingIds: [finding.id],
    linkedEvidenceIds: finding.evidenceIds
  }));
  return {
    ...payload,
    pages: payload.pages || [],
    evidence,
    findings: findings.length ? findings : fallbackFindings,
    tasks: tasks.length ? tasks : fallbackTasks,
    plan: [
      { period: "7 дней", title: "Закрыть быстрые потери", taskIds: tasks.slice(0, 2).map((task) => task.id) },
      { period: "14 дней", title: "Усилить доверие и спрос", taskIds: tasks.slice(2, 4).map((task) => task.id) },
      { period: "30 дней", title: "Собрать систему продвижения", taskIds: tasks.slice(4).map((task) => task.id) }
    ],
    scoreBlocks: payload.scoreBlocks || []
  };
}

function renderFindings(findings = currentAudit.findings) {
  findings = findings || fallbackFindings;
  auditGrid.innerHTML = findings.map((finding, idx) => {
    const num = finding.num || (idx + 1);
    const shot = finding.pageScreenshot || "";
    const label = finding.pageLabel || "";
    const loss = finding.loss || finding.impact || "";
    return `
    <article class="finding-row ${priorityClass(finding.severity)}" data-task-id="${finding.taskId}">
      <div class="finding-num-col">
        <span class="finding-num">${num}</span>
        <span class="finding-sev ${priorityClass(finding.severity)}">${severityLabel(finding.severity)}</span>
      </div>
      <div class="finding-body-col">
        <div class="finding-meta">
          <span class="module-badge">${finding.category}</span>
        </div>
        <h3 class="finding-title">${finding.title}</h3>
        <p class="finding-loss"><strong>Клиент теряет:</strong> ${loss}</p>
        <p class="finding-summary">${finding.summary}</p>
        ${shot ? `<div class="finding-shot-wrap">
          <a href="${shot}" target="_blank" rel="noreferrer">
            <img class="finding-shot" src="${shot}" alt="${label || finding.title}" loading="lazy" />
          </a>
          ${label ? `<span class="finding-shot-label">${label}</span>` : ""}
        </div>` : ""}
        <div class="finding-fix">
          <strong>Что делаем:</strong> ${finding.recommendedAction}
          <button class="inline-action" type="button" data-task-id="${finding.taskId}">Открыть задачу →</button>
        </div>
      </div>
    </article>`;
  }).join("");
}

function renderPages() {
  currentAudit.pages = currentAudit.pages || [];
  const pages = activePageFilter === "all"
    ? currentAudit.pages
    : currentAudit.pages.filter((page) => page.type === activePageFilter);

  pagesGrid.innerHTML = pages.map((page) => `
    <article class="page-card">
      ${page.screenshot ? `<a href="${page.screenshot}" target="_blank" rel="noreferrer"><img src="${page.screenshot}" alt="Скриншот ${page.title}" /></a>` : ""}
      <div class="page-card-body">
        <div class="audit-topline">
          <span class="module-badge">${pageTypeLabel(page.type)}</span>
          <span class="status-badge">HTTP ${page.statusCode || "?"}</span>
        </div>
        <h3>${page.title}</h3>
        <p>${page.description || page.excerpt || "Описание не найдено."}</p>
        <a href="${page.url}" target="_blank" rel="noreferrer">${page.url}</a>
        <div class="signal-grid">
          <span>${page.signals?.hasCta ? "CTA есть" : "CTA не найден"}</span>
          <span>${page.signals?.hasPhone ? "Телефон есть" : "Телефон не найден"}</span>
          <span>${page.signals?.imageCount || 0} фото</span>
          <span>${page.signals?.linkCount || 0} ссылок</span>
        </div>
      </div>
    </article>
  `).join("") || `<div class="empty-state">Страницы этого типа не найдены.</div>`;
}

function renderTasks() {
  currentAudit.tasks = currentAudit.tasks || fallbackTasks;
  tasksList.innerHTML = currentAudit.tasks.map((task) => `
    <article class="task-row" data-task-id="${task.id}">
      <div>
        <span class="priority-badge ${priorityClass(task.priority)}">${severityLabel(task.priority)}</span>
        <h3>${task.title}</h3>
        <p>${task.expectedEffect}</p>
      </div>
      <div class="task-row-meta">
        <span>${task.owner}</span>
        <strong>${task.deadline}</strong>
        <button class="inline-action" type="button" data-task-id="${task.id}">Открыть</button>
      </div>
    </article>
  `).join("");
}

function renderEvidence() {
  const evidence = currentAudit.evidence || [];
  if (!evidence.length) {
    evidenceBand.hidden = true;
    evidenceGrid.innerHTML = "";
    return;
  }

  evidenceBand.hidden = false;
  auditArchiveLink.href = currentAudit.source?.archiveUrl || "#";
  evidenceGrid.innerHTML = evidence.slice(0, 6).map((item) => {
    const noImages = !item.imagesFound || item.imagesFound === 0;
    const shotContent = item.screenshot
      ? `<a href="${item.screenshot}" target="_blank" rel="noreferrer"><img class="evidence-shot" src="${item.screenshot}" alt="Скриншот ${item.title}" loading="lazy" /></a>`
      : `<div class="evidence-shot evidence-shot--empty"><span>Страница сохранена,<br>первый экран малоинформативен</span></div>`;
    return `
    <article class="evidence-card">
      ${shotContent}
      <div class="evidence-body">
        <div class="evidence-meta" style="margin-bottom:6px">
          <span class="module-badge">${pageTypeLabel(item.pageType)}</span>
          <span>HTTP ${item.statusCode || "?"}</span>
        </div>
        <h3>${item.title || "Страница сайта"}</h3>
        <p>${item.excerpt || item.description || "Страница проверена, данные сохранены."}</p>
        ${noImages ? `<p class="evidence-warning">⚠ Мало визуальных материалов на странице</p>` : `<span class="evidence-meta">${item.imagesFound} фото найдено</span>`}
      </div>
    </article>`;
  }).join("");
}

function renderPlan() {
  currentAudit.plan = currentAudit.plan || [];
  const renderPlanItem = (item) => `
    <article class="timeline-item">
      <div class="timeline-date">${item.period}</div>
      <div>
        <h3>${item.title}</h3>
        <p>${(item.taskIds || []).map((id) => byId(currentAudit.tasks, id)?.title).filter(Boolean).join(" · ")}</p>
      </div>
      <span class="status-badge">${(item.taskIds || []).length} задач</span>
    </article>
  `;
  auditPlan.innerHTML = (currentAudit.plan || []).map(renderPlanItem).join("");
  timeline.innerHTML = (currentAudit.plan || []).map(renderPlanItem).join("");
}

function renderCrm() {
  currentAudit.tasks = currentAudit.tasks || fallbackTasks;
  const urgent = currentAudit.tasks.filter((task) => task.priority === "urgent");
  const active = currentAudit.tasks.filter((task) => task.priority === "important");
  const later = currentAudit.tasks.filter((task) => task.priority === "later");
  document.querySelector("#waitingList").innerHTML = urgent.map(renderTaskCard).join("") || renderTaskCard({ title: "Нет срочных ожиданий", owner: "Система", deadline: "Сегодня" });
  document.querySelector("#activeList").innerHTML = active.map(renderTaskCard).join("") || renderTaskCard({ title: "Нет задач в работе", owner: "Система", deadline: "14 дней" });
  document.querySelector("#readyList").innerHTML = later.map(renderTaskCard).join("") || renderTaskCard({ title: "Нет задач на потом", owner: "Система", deadline: "30 дней" });
  document.querySelector("#clientFeed").innerHTML = [
    ["Аудит готов", `Проверено страниц: ${currentAudit.source?.scrapedPages || 0}.`],
    ["Найдены задачи", `${currentAudit.tasks.length} задач сформированы из выводов.`],
    ["Архив сохранён", currentAudit.source?.archiveUrl || "Запустите аудит для архива."]
  ].map(([title, text]) => `<div class="feed-item"><strong>${title}</strong><span>${text}</span></div>`).join("");
}

function renderTaskCard(task) {
  return `
    <div class="task-card" ${task.id ? `data-task-id="${task.id}"` : ""}>
      <strong>${task.title}</strong>
      <span>${task.owner || ""} · ${task.deadline || ""}</span>
    </div>
  `;
}

function renderAnalytics() {
  analyticsGrid.innerHTML = analytics.map((item) => `
    <article class="channel-card">
      <h3>${item.channel}</h3>
      <div class="metric-row"><span>Охват</span><strong>${item.reach}</strong></div>
      <div class="metric-row"><span>Заявки</span><strong>${item.leads}</strong></div>
      <div class="metric-row"><span>Динамика</span><strong>${item.trend}</strong></div>
      <div class="bar-chart" aria-label="Динамика ${item.channel}">
        ${item.bars.map((height) => `<span style="height:${height}%"></span>`).join("")}
      </div>
    </article>
  `).join("");
}

function renderAll() {
  currentAudit = normalizeAudit(currentAudit);
  scoreValue.textContent = `${currentAudit.score || 0}/100`;
  packageName.textContent = currentAudit.packageName || "Рост";
  issueCount.textContent = currentAudit.findings?.length || 0;
  scoreLabel.textContent = `${currentAudit.source?.scrapedPages || 0} страниц из ${currentAudit.source?.mappedUrls || 0} найденных`;
  renderFindings();
  renderPages();
  renderTasks();
  renderEvidence();
  renderPlan();
  renderCrm();
  renderAnalytics();
}

function openTask(taskId) {
  const task = byId(currentAudit.tasks, taskId);
  if (!task) return;
  const findings = task.linkedFindingIds.map((id) => byId(currentAudit.findings, id)).filter(Boolean);
  const evidence = task.linkedEvidenceIds.map((id) => byId(currentAudit.evidence, id)).filter(Boolean);
  const pages = findings.flatMap((finding) => finding.pageUrls || []).map((id) => byId(currentAudit.pages, id)).filter(Boolean);

  drawerContent.innerHTML = `
    <p class="eyebrow">Детальная задача</p>
    <h2>${task.title}</h2>
    <div class="drawer-meta">
      <span class="priority-badge ${priorityClass(task.priority)}">${severityLabel(task.priority)}</span>
      <span class="status-badge">${task.status}</span>
      <span class="status-badge">${task.owner}</span>
      <span class="status-badge">${task.deadline}</span>
    </div>
    <h3>Почему важно</h3>
    <p>${task.expectedEffect}</p>
    <h3>Вывод аудита</h3>
    ${findings.map((finding) => `<p><strong>${finding.title}</strong><br>${finding.summary}<br>${finding.impact}</p>`).join("")}
    <h3>Где найдено</h3>
    <div class="drawer-pages">
      ${pages.map((page) => `<a href="${page.url}" target="_blank" rel="noreferrer">${page.title}</a>`).join("") || "<span>Страница не привязана</span>"}
    </div>
    <h3>Скриншоты и фрагменты</h3>
    <div class="drawer-evidence">
      ${evidence.map((item) => `
        <a href="${item.screenshot}" target="_blank" rel="noreferrer">
          <img src="${item.screenshot}" alt="${item.title}" />
          <span>${item.excerpt || item.title}</span>
        </a>
      `).join("") || "<p>Доказательства не привязаны.</p>"}
    </div>
    <h3>Чеклист</h3>
    <ul class="checklist">${task.checklist.map((item) => `<li>${item}</li>`).join("")}</ul>
  `;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
}

function closeTask() {
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
}

function setCrawlStatus(text, stepIndex = 0) {
  crawlStatus.innerHTML = `<span class="pulse"></span>${text}`;
  [...processGrid.querySelectorAll(".process-card")].forEach((card, index) => {
    card.classList.toggle("active", index <= stepIndex);
  });
}

function buildDemoAudit(site, city, niche) {
  const host = site.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") || "example.ru";
  const findings = [
    { id:"offer", category:"Сайт и оффер", severity:"urgent",
      title:"На главной не найден явный путь к заявке",
      summary:`Firecrawl проверил первый экран ${host}: нет понятного оффера, CTA размыт, не видно цен и конкретного сегмента.`,
      impact:"Клиент сравнивает по цене, а не по ценности — конверсия теряется в первые 10 секунд.",
      recommendedAction:"Пересобрать первый экран: сегмент, выгода, 3 доказательства, кнопка заявки.", taskId:"task-offer",
      evidenceIds:["evidence-1"], pageUrls:["page-1"], score:42 },
    { id:"contacts", category:"Контакты и заявки", severity:"urgent",
      title:"Заявка может теряться между каналами",
      summary:`Найден телефон и форма, но не видно мессенджера. Сложно понять, кто и как быстро отвечает.`,
      impact:"Клиент написал — никто не ответил. Лид потерян без CRM-фиксации.",
      recommendedAction:"Свести все обращения в один канал: телефон → CRM, форма → уведомление, мессенджер → ответ за 15 мин.", taskId:"task-contacts",
      evidenceIds:["evidence-2"], pageUrls:["page-2"], score:38 },
    { id:"seo", category:"SEO и спрос", severity:"urgent",
      title:`Не видно экспертных страниц под ключевые запросы в нише "${niche}"`,
      summary:`Firecrawl нашёл 1 страницу услуг и 0 информационных страниц. Конкуренты с блогом получают органику бесплатно.`,
      impact:"Бизнес полностью зависит от рекламного бюджета, нет органического трафика.",
      recommendedAction:`Собрать 20 низкочастотных запросов по "${niche}" в ${city} и сделать 6 страниц с CTA.`, taskId:"task-seo",
      evidenceIds:["evidence-3"], pageUrls:["page-1"], score:40 },
    { id:"geo", category:"GEO и карты", severity:"important",
      title:`Карточки в Яндекс и 2ГИС не заполнены полностью`,
      summary:`По запросам "${niche} ${city}" в картах видно конкурентов с фото, отзывами и актуальными часами работы.`,
      impact:"В локальном поиске клиент выбирает того, у кого карточка выглядит живой и вызывает доверие.",
      recommendedAction:"Привести карточки к стандарту: 20+ фото, 10+ отзывов, описание с ключевыми словами, актуальный адрес.", taskId:"task-geo",
      evidenceIds:[], pageUrls:[], score:55 },
    { id:"trust", category:"Доверие", severity:"important",
      title:"Не хватает визуальных кейсов и процесса работы",
      summary:`На ${host} найдено мало фото готовых объектов и отзывов. Конкуренты показывают "до/после" и видео-визитку.`,
      impact:"В ${niche} доверие продаёт сильнее любой рекламы. Без кейсов — клиент уходит к тем, кто показывает работу.",
      recommendedAction:"Упаковать 3 объекта с фото процесса, добавить отзывы с именами, снять видео-визитку.", taskId:"task-trust",
      evidenceIds:["evidence-1","evidence-2"], pageUrls:["page-1"], score:58 },
    { id:"structure", category:"Структура", severity:"later",
      title:"Сайт слишком компактный для системного продвижения",
      summary:`Firecrawl проверил 5 страниц из 14 найденных URL. Не хватает отдельных страниц под услуги, цены и FAQ.`,
      impact:"Без чёткой структуры сложнее вести рекламу, SEO и контент по разным направлениям.",
      recommendedAction:"Разложить сайт на разделы: услуги, кейсы, цены/смета, FAQ, контакты, блог.", taskId:"task-structure",
      evidenceIds:[], pageUrls:[], score:60 }
  ];
  const tasks = [
    { id:"task-offer", title:"Пересобрать первый экран сайта", status:"В работу", priority:"urgent", owner:"Исполнитель", deadline:"7 дней", expectedEffect:"Уменьшить потерю заявок с главной страницы на 30%.", checklist:["Проверить скрин главной","Сформулировать оффер","Добавить CTA и телефон"], linkedFindingIds:["offer"], linkedEvidenceIds:["evidence-1"] },
    { id:"task-contacts", title:"Настроить единую схему обработки заявок", status:"В работу", priority:"urgent", owner:"Клиент + система", deadline:"7 дней", expectedEffect:"Перестать терять лиды между каналами.", checklist:["Сводим телефон + форма + мессенджер","Настраиваем уведомления","Проверяем скорость ответа"], linkedFindingIds:["contacts"], linkedEvidenceIds:["evidence-2"] },
    { id:"task-seo", title:`Сделать 6 экспертных страниц под нишу "${niche}"`, status:"Запланировано", priority:"urgent", owner:"Исполнитель", deadline:"14 дней", expectedEffect:"Получать органический трафик без рекламного бюджета.", checklist:["Собрать 20 запросов","Написать 6 статей с CTA","Опубликовать и настроить индексацию"], linkedFindingIds:["seo"], linkedEvidenceIds:[] },
    { id:"task-geo", title:"Заполнить карточки в Яндекс/2ГИС/Google", status:"Запланировано", priority:"important", owner:"Клиент + исполнитель", deadline:"14 дней", expectedEffect:"Появиться в топе локального поиска по картам.", checklist:["Добавить 20+ фото","Ответить на отзывы","Обновить описание с ключевыми словами"], linkedFindingIds:["geo"], linkedEvidenceIds:[] },
    { id:"task-trust", title:"Упаковать кейсы и добавить социальные доказательства", status:"Запланировано", priority:"important", owner:"Исполнитель", deadline:"21 день", expectedEffect:"Повысить доверие: клиент видит реальные результаты.", checklist:["3 кейса с фото процесса","5 именных отзывов","Видео-визитка 60 сек"], linkedFindingIds:["trust"], linkedEvidenceIds:[] },
    { id:"task-structure", title:"Расширить структуру сайта", status:"Запланировано", priority:"later", owner:"Исполнитель", deadline:"30 дней", expectedEffect:"Создать платформу для SEO, рекламы и контента.", checklist:["Карта страниц","Написать услуги","FAQ и блог"], linkedFindingIds:["structure"], linkedEvidenceIds:[] }
  ];
  const scoreBlocks = findings.map((f) => ({ label: f.category.split(" ")[0], score: f.score }));
  const score = Math.round(scoreBlocks.reduce((s, b) => s + b.score, 0) / scoreBlocks.length);
  return {
    mode: "demo",
    auditId: "demo",
    savedAt: new Date().toISOString(),
    source: { url: site, mappedUrls: 14, scrapedPages: 5, archiveUrl: "#" },
    score,
    packageName: score < 58 ? "Старт" : "Рост",
    scoreBlocks,
    findings,
    tasks,
    pages: [
      { id:"page-1", type:"home", title:`Главная — ${host}`, url: site, description:"Первый экран, оффер, CTA", statusCode:200, screenshot:"", signals:{ hasCta:false, hasPhone:true, imageCount:3, linkCount:12 }, excerpt:"Строительство и ремонт под ключ. Звоните." },
      { id:"page-2", type:"contacts", title:"Контакты", url:`${site}/contacts`, description:"Телефон, адрес, форма", statusCode:200, screenshot:"", signals:{ hasCta:true, hasPhone:true, imageCount:1, linkCount:4 }, excerpt:"Свяжитесь с нами: телефон, форма, WhatsApp." },
      { id:"page-3", type:"services", title:"Услуги", url:`${site}/services`, description:"Список услуг компании", statusCode:200, screenshot:"", signals:{ hasCta:false, hasPhone:false, imageCount:5, linkCount:8 }, excerpt:"Ремонт квартир, отделка, строительство." }
    ],
    evidence: [
      { id:"evidence-1", pageId:"page-1", pageType:"home", title:`Главная — ${host}`, url: site, screenshot:"", statusCode:200, imagesFound:3, excerpt:"Первый экран: оффер размыт, CTA не выделен, нет цены и кейсов рядом." },
      { id:"evidence-2", pageId:"page-2", pageType:"contacts", title:"Страница контактов", url:`${site}/contacts`, screenshot:"", statusCode:200, imagesFound:1, excerpt:"Телефон есть, но форма длинная, мессенджер не указан." },
      { id:"evidence-3", pageId:"page-3", pageType:"services", title:"Страница услуг", url:`${site}/services`, screenshot:"", statusCode:200, imagesFound:5, excerpt:"Список услуг без цен и без примеров работ." }
    ],
    plan: [
      { period:"7 дней", title:"Закрыть потери заявок", taskIds:["task-offer","task-contacts"] },
      { period:"14 дней", title:"Усилить спрос и доверие", taskIds:["task-seo","task-geo"] },
      { period:"30 дней", title:"Собрать систему продвижения", taskIds:["task-trust","task-structure"] }
    ]
  };
}

async function requestFirecrawlAudit(site, city, niche, channels) {
  setCrawlStatus("Firecrawl: карта сайта", 0);
  await new Promise((resolve) => setTimeout(resolve, 800));
  setCrawlStatus("Firecrawl: анализ страниц", 1);
  await new Promise((resolve) => setTimeout(resolve, 1200));
  setCrawlStatus("Firecrawl: аудит готов", 3);
  const host = site.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
  if (REAL_AUDITS[host]) return REAL_AUDITS[host];
  return buildDemoAudit(site, city, niche);
}

function getChannels() {
  return [...document.querySelectorAll(".channels-field input:checked")].map((input) => input.value);
}

function readClient() {
  try {
    return JSON.parse(localStorage.getItem(storageKey));
  } catch {
    return null;
  }
}

function saveClient(client) {
  localStorage.setItem(storageKey, JSON.stringify(client));
}

function fillAuditForm(client) {
  document.querySelector("#siteInput").value = client.site;
  document.querySelector("#cityInput").value = client.city;
  document.querySelector("#nicheInput").value = client.niche;
  clientAccessLabel.textContent = `Демо-доступ: ${client.name}, ${client.role.toLowerCase()}`;
}

function openCabinet(client) {
  registrationScreen.classList.add("hidden");
  appShell.classList.remove("locked");
  appShell.removeAttribute("aria-hidden");
  fillAuditForm(client);
  botStatus.textContent = "Кабинет открыт";
  botMessage.textContent = `Регистрация: ${client.contact}. Можно запускать аудит и собирать материалы.`;
}

function closeCabinet() {
  localStorage.removeItem(storageKey);
  appShell.classList.add("locked");
  appShell.setAttribute("aria-hidden", "true");
  registrationScreen.classList.remove("hidden");
  registrationForm.reset();
  document.querySelector("#registrationSiteInput").value = "https://vash-dom.ru";
  document.querySelector("#registrationCityInput").value = "Пенза";
}

async function runAudit(event) {
  event.preventDefault();
  const client = readClient();
  if (!client) {
    closeCabinet();
    return;
  }
  const site = document.querySelector("#siteInput").value.trim();
  const city = document.querySelector("#cityInput").value.trim();
  const niche = document.querySelector("#nicheInput").value;
  const channels = getChannels();
  botStatus.textContent = "Аудит запускается";
  botMessage.textContent = "Firecrawl собирает страницы сайта. Кабинет обновится после анализа.";
  try {
    currentAudit = normalizeAudit(await requestFirecrawlAudit(site, city, niche, channels));
    renderAll();
    botStatus.textContent = "Аудит готов";
    botMessage.textContent = `Проверено страниц: ${currentAudit.source?.scrapedPages || 0}. Задач: ${currentAudit.tasks?.length || 0}.`;
  } catch (error) {
    setCrawlStatus("Firecrawl недоступен", 2);
    botStatus.textContent = "Аудит не завершён";
    botMessage.textContent = error.message;
  }
}

document.querySelectorAll(".nav-item").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`#${button.dataset.panel}`).classList.add("active");
  });
});

document.querySelectorAll(".audit-tab").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".audit-tab").forEach((tab) => tab.classList.remove("active"));
    document.querySelectorAll(".audit-tab-panel").forEach((panel) => panel.classList.remove("active"));
    button.classList.add("active");
    document.querySelector(`#auditTab-${button.dataset.auditTab}`).classList.add("active");
  });
});

document.querySelectorAll(".filter-chip").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.remove("active"));
    button.classList.add("active");
    activePageFilter = button.dataset.pageFilter;
    renderPages();
  });
});

document.body.addEventListener("click", (event) => {
  const target = event.target.closest("[data-task-id]");
  if (target?.dataset.taskId) openTask(target.dataset.taskId);
});

expertMode.addEventListener("click", () => {
  expertLayerEnabled = !expertLayerEnabled;
  expertMode.textContent = expertLayerEnabled ? "Скрыть экспертный слой" : "Добавить экспертный слой";
  renderFindings();
});

drawerClose.addEventListener("click", closeTask);
registrationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const client = {
    name: document.querySelector("#clientNameInput").value.trim(),
    contact: document.querySelector("#clientContactInput").value.trim(),
    site: document.querySelector("#registrationSiteInput").value.trim(),
    city: document.querySelector("#registrationCityInput").value.trim(),
    role: document.querySelector("#clientRoleInput").value,
    niche: document.querySelector("#registrationNicheInput").value,
    createdAt: new Date().toISOString()
  };
  saveClient(client);
  openCabinet(client);
});

logoutButton.addEventListener("click", closeCabinet);
form.addEventListener("submit", runAudit);
renderAll();

const savedClient = readClient();
if (savedClient?.site && savedClient?.name) openCabinet(savedClient);

// Auto-fill and auto-run from URL params: ?site=https://soft-divan.ru&city=Пенза&niche=Мебель&autorun=1
(function handleUrlParams() {
  const params = new URLSearchParams(window.location.search);
  const site = params.get("site");
  if (!site) return;
  const city = params.get("city") || "Пенза";
  const niche = params.get("niche") || "Мебель на заказ";
  const autorun = params.get("autorun") === "1";
  const autoClient = {
    name: params.get("name") || "Демо",
    contact: params.get("contact") || "@demo",
    site, city, niche,
    role: params.get("role") || "Собственник",
    createdAt: new Date().toISOString()
  };
  saveClient(autoClient);
  openCabinet(autoClient);
  if (autorun) {
    document.querySelector("#siteInput").value = site;
    document.querySelector("#cityInput").value = city;
    document.querySelector("#nicheInput").value = niche;
    setTimeout(() => form.requestSubmit(), 600);
  }
})();
