import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { getDateLabel } from './dateUtils';

describe('getDayType', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("возвращает 'Сегодня' для текущей даты", () => {
    vi.setSystemTime(new Date('2026-03-25'));

    const result = getDateLabel('2026-03-25');

    expect(result).toBe('Сегодня');
  });

  it("возвращает 'Завтра' для следующего дня", () => {
    vi.setSystemTime(new Date('2026-03-25'));

    const result = getDateLabel('2026-03-26');

    expect(result).toBe('Завтра');
  });

  it('возвращает форматированную дату для других дней', () => {
    vi.setSystemTime(new Date('2026-03-25'));

    const result = getDateLabel('2026-03-28');

    expect(result).toBe('28 мар.');
  });
});
