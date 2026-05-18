# Подробный план: Полная полировка и доработка Hero и ServicesSequence

Этот план содержит детальное описание изменений, структур данных и CSS-классов для устранения всех упущений.

## Цель
Довести компоненты до премиального уровня, добавив локализацию, адаптировав мобильную верстку, наполнив контентом и оптимизировав анимацию.

## Предлагаемые изменения

### 1. Локализация и Контент (Пункты 1 и 3)

#### [MODIFY] `en.json`, `no.json`, `ru.json`(file:///c:/Users/great/Documents/bussiness/Amedia/website_public/src/locales/)
- Добавить детальную структуру для услуг. Пример для `ru.json`:
```json
"services": {
  "title": "Что мы делаем",
  "subtitle": "Наши услуги",
  "desc": "Мы помогаем брендам расти, объединяя стратегию, креатив и технологии.",
  "items": [
    {
      "title": "Performance",
      "desc": "Маркетинг, основанный на данных. Нацелен на измеримый ROI и масштабирование вашего бизнеса."
    },
    {
      "title": "Branding",
      "desc": "Создание уникальной айдентики и голоса бренда, которые выделяют вас на рынке."
    },
    {
      "title": "Creative",
      "desc": "Визуальные концепты и контент, которые захватывают внимание и вызывают эмоции."
    },
    {
      "title": "Strategy",
      "desc": "Комплексное планирование развития бизнеса и маркетинговых активностей на долгосрок."
    }
  ]
}
```

#### [MODIFY] `services-sequence.tsx`(file:///c:/Users/great/Documents/bussiness/Amedia/website_public/src/components/sections/hero/services-sequence.tsx)
- Заменить хардкод массив `SERVICES` на получение данных:
```typescript
const services = t('services.items', { returnObjects: true }) as Array<{title: string, desc: string}>;
```
- Использовать `t('services.title')` и `t('services.subtitle')`.

### 2. Адаптивность для мобильных (Пункт 2)

#### [MODIFY] `services-sequence.tsx`(file:///c:/Users/great/Documents/bussiness/Amedia/website_public/src/components/sections/hero/services-sequence.tsx)
- Изменить порядок и высоту блоков для мобильных:
  - Добавить `order-first md:order-last` для блока с Canvas, чтобы на мобильных он был сверху.
  - Высота блока на мобильных: `h-[40vh]`. На десктопе: `h-screen`.
  - Текст на мобильных будет скроллиться под зафиксированным сверху канвасом.

### 3. Оптимизация зависимостей GSAP (Пункт 4)

#### [MODIFY] `use-hero-sequence.ts`(file:///c:/Users/great/Documents/bussiness/Amedia/website_public/src/components/sections/hero/use-hero-sequence.ts)
- В `useGSAP` добавить проверку:
```typescript
if (!imagesLoaded) return;
```
- Это предотвратит попытки инициализации анимации до того, как картинки готовы, и избавит от потенциального мерцания "заглушки".

## План верификации
- Проверить переключение языков (все 3 языка должны отображать новые тексты).
- Проверить на мобильном разрешении (375px): Canvas должен быть сверху и занимать 40% экрана, не перекрывая текст полностью.
