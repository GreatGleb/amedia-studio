# План: Рефакторинг HeroCanvas

Вынесение логики загрузки изображений и управления канвасом в кастомный хук для соблюдения принципов DDD и SOLID (Single Responsibility).

## Цель
Подготовить код к изменениям по плану `hero-update.md`, сделав компонент `HeroCanvas` более простым и переиспользуемым.

## Предлагаемые изменения

### Компонент Hero

#### [NEW] `use-hero-sequence.ts`(file:///c:/Users/great/Documents/bussiness/Amedia/website_public/src/components/sections/hero/use-hero-sequence.ts)
- Создать кастомный хук `useHeroSequence`.
- Параметры: `framesCount: number`, `imagesPath: string`.
- Логика:
  - Загрузка изображений (preload).
  - Управление состоянием загрузки (`imagesLoaded`).
  - Логика рендеринга на canvas.
  - Настройка GSAP анимации (ScrollTrigger).
- Возвращаемые значения: `canvasRef`, `containerRef`, `imagesLoaded`.

#### [MODIFY] `hero-canvas.tsx`(file:///c:/Users/great/Documents/bussiness/Amedia/website_public/src/components/sections/hero/hero-canvas.tsx)
- Удалить локальную логику загрузки и рендеринга.
- Использовать хук `useHeroSequence`.
- Упростить компонент до отображения canvas и обработки fallback состояния (placeholder).

## Верификация
- Визуальная проверка работы анимации при скролле.
- Отсутствие ошибок в консоли разработчика.
