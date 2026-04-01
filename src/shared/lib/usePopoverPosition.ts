import { useState, useLayoutEffect, useEffect, type RefObject } from 'react';

type Position = { top: number; left: number };

type UsePopoverPositionOptions = {
  offset?: number;          // отступ от якоря (по умолчанию 4px)
  autoAdjust?: boolean;    // корректировать, чтобы влезало в окно
  defaultVisible?: boolean; // начальная видимость
};

/**
 * Хук для вычисления позиции выпадающего элемента (попапа/календаря)
 * относительно якоря, с плавным появлением и коррекцией по краям экрана.
 *
 * @param anchorEl - DOM-элемент, относительно которого позиционируем
 * @param targetRef - ref элемента, позицию которого вычисляем (для измерения размеров)
 * @param options - настройки
 * @returns { position, isVisible, setPosition, setIsVisible }
 */
export const usePopoverPosition = (
  anchorEl: HTMLElement | null,
  targetRef: RefObject<HTMLElement | null>,
  options: UsePopoverPositionOptions = {}
) => {
  const { offset = 4 } = options;

  const [position, setPosition] = useState<Position>({ top: 0, left: 0 });
  const [isVisible, setIsVisible] = useState(false);

  // Вычисляем позицию сразу, до рендера, но не делаем видимым
  useLayoutEffect(() => {
    if (!anchorEl) {
      setIsVisible(false);
      return;
    }

    const rect = anchorEl.getBoundingClientRect();
    setPosition({
      top: rect.bottom + window.scrollY + offset,
      left: rect.left + window.scrollX,
    });

    // Плавное появление после того, как браузер вычислит layout
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, [anchorEl, offset]);

  // Корректировка, если элемент вылезает за пределы экрана
  useEffect(() => {
    if (!isVisible || !targetRef.current) return;

    const targetRect = targetRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let newTop = position.top;
    let newLeft = position.left;

    // Коррекция по вертикали: если не помещается снизу, ставим над якорем
    if (targetRect.bottom > viewportHeight) {
      const anchorRect = anchorEl!.getBoundingClientRect();
      newTop = anchorRect.top + window.scrollY - targetRect.height - offset;
    }

    // Коррекция по горизонтали: если не помещается справа, придвигаем к левому краю
    if (targetRect.right > viewportWidth) {
      newLeft = position.left - (targetRect.right - viewportWidth);
    }
    // Если вылезает за левый край, придвигаем к 0
    if (newLeft < 0) {
      newLeft = 0;
    }

    if (newTop !== position.top || newLeft !== position.left) {
      setPosition({ top: newTop, left: newLeft });
    }
  }, [isVisible, position, anchorEl, targetRef, offset]);

  return { position, isVisible, setIsVisible, setPosition };
};