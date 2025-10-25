import {sortMap} from "../lib/sort.js";

export function initSorting(columns) {
    return (query, state, action) => {
        let field = null;
        let order = null;

        if (action && action.name === 'sort') {
            // апоминаем выбранный режим сортировки
            action.dataset.value = sortMap[action.dataset.value];  // сохраним и применим как текущее следующее состояние из карты
            field = action.dataset.field;                          // информация о сортируемом поле есть также в кнопке
            order = action.dataset.value;                          // направление заберём прямо из датасета для точности

            // сбрасываем сортировки остальных колонок
            // визуализация иконки, кстати, тоже опирается на значения в data-value, поэтому её не нужно менять отдельно. Рекомендуем запомнить этот приём.
            columns.forEach(column => {                               // перебираем элементы (в columns у нас массив кнопок)
                if (column.dataset.field !== action.dataset.field) {  // если это не та кнопка, что нажал пользователь
                    column.dataset.value = 'none';                    // тогда сбрасываем её в начальное состояние
                }
            });

        } else {
            // получаем выбранный режим сортировки
            columns.forEach(column => {                 // перебираем все наши кнопки сортировки
                if (column.dataset.value !== 'none') {  // ищем ту, что находится не в начальном состоянии (предполагаем, что одна)
                    field = column.dataset.field;       // сохраняем в переменных поле
                    order = column.dataset.value;       // и направление сортировки
                }
            });
        }

        const sort = (field && order !== 'none') ? `${field}:${order}` : null; // сохраним в переменную параметр сортировки в виде field:direction

        return sort ? Object.assign({}, query, { sort }) : query; // по общему принципу, если есть сортировка, добавляем, если нет, то не трогаем query
    }
}