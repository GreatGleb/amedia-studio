# План: Рефакторинг навигации хедера

## Текущее состояние

В хедере сейчас 4 пункта навигации (в [`header.tsx`](../src/components/layout/header.tsx:46-49)):

| Пункт | Перевод (en) | Якорь | Секция на странице |
|-------|-------------|-------|-------------------|
| `nav.vision` | Vision | `#about` | About |
| `nav.roi` | ROI | `#roi` | ROICalculator |
| `nav.portfolio` | Portfolio | `#portfolio` | Portfolio |
| `nav.contact` | Contact | `#contact` | ContactForm |

**Проблемы:**
1. Пункт "Vision" ведёт на секцию About — название не соответствует содержимому
2. Секции **Services** и **Team** существуют на странице, но не имеют ссылок в хедере
3. Секции About, Services, Team не имеют `id`-атрибутов для якорной навигации

## Целевое состояние

Новый хедер будет содержать 4 пункта:

| Пункт (en) | Пункт (ru) | Пункт (no) | Якорь | Секция |
|-----------|-----------|-----------|-------|--------|
| About Us | О нас | Om Oss | `#about` | About |
| Services | Услуги | Tjenester | `#services` | ServicesSequence |
| Portfolio | Портфолио | Portefølje | `#portfolio` | Portfolio |
| Team | Команда | Team | `#team` | Team |

## Изменения по файлам

### 1. [`src/components/sections/about.tsx`](../src/components/sections/about.tsx:41)
- Добавить `id="about"` на `<section>` элемент

### 2. [`src/components/sections/hero/services-sequence.tsx`](../src/components/sections/hero/services-sequence.tsx:215)
- Добавить `id="services"` на `<section>` элемент

### 3. [`src/components/sections/team.tsx`](../src/components/sections/team.tsx:52)
- Добавить `id="team"` на `<section>` элемент

### 4. [`src/components/layout/header.tsx`](../src/components/layout/header.tsx:45-50)
- Заменить текущие 4 пункта на новые:
  - `nav.about` → `#about`
  - `nav.services` → `#services`
  - `nav.portfolio` → `#portfolio`
  - `nav.team` → `#team`
- Убрать старые ключи `nav.vision`, `nav.roi`, `nav.contact`

### 5. Локализация — все 3 файла

#### [`src/locales/en.json`](../src/locales/en.json:2-8)
```json
"nav": {
  "about": "About Us",
  "services": "Services",
  "portfolio": "Portfolio",
  "team": "Team"
}
```

#### [`src/locales/ru.json`](../src/locales/ru.json:2-8)
```json
"nav": {
  "about": "О нас",
  "services": "Услуги",
  "portfolio": "Портфолио",
  "team": "Команда"
}
```

#### [`src/locales/no.json`](../src/locales/no.json:2-8)
```json
"nav": {
  "about": "Om Oss",
  "services": "Tjenester",
  "portfolio": "Portefølje",
  "team": "Team"
}
```

### 6. Обновление `labels` (опционально)

Сейчас в `labels` есть нумерация:
- `01. Vision` → можно переименовать в `01. About Us`
- `02. Results` → можно переименовать в `02. Services`
- `03. Cases` → можно переименовать в `03. Portfolio`
- `Ready to Grow?` → можно оставить или переименовать в `04. Team`

**Важно:** `labels` используется в других местах (например, в секции About как `about.label` = `01. About Us`), поэтому нужно проверить, где именно используется каждый ключ, прежде чем менять.

## Проверка

После внесения изменений:
1. Все 4 пункта хедера корректно отображаются на всех 3 языках
2. Клик по каждому пункту плавно скроллит к соответствующей секции
3. Секции About, Services, Team имеют корректные id для якорей
4. Старые ключи `nav.vision`, `nav.roi`, `nav.contact` удалены из локализации (если не используются в других местах)
