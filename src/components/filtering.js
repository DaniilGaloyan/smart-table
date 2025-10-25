export function initFiltering(elements) {
    const updateIndexes = (elements, indexes) => {
        Object.keys(indexes)                                              // получаем ключи из объекта
            .forEach((elementName) => {                                   // перебираем по имени
                elements[elementName].append(                             // в каждый элемент добавляем опции
                        ...Object.values(indexes[elementName])            // формируем массив имён, значений опций
                            .map(name => {                                // используйте name как значение и текстовое содержимое
                            const el = document.createElement('option');  // создаем тег опции
                            el.textContent = name;                        // используем name как текстовое содержимое
                            el.value = name;                              // используем name как значение
                            return el;                                    // возвращаем тег опции
            }))
        })
    }

    const applyFiltering = (query, state, action) => {
        // обрабатываем очистку поля
        if (action && action.name === 'clear') {
            const field = action.dataset.field;
            const parent = action.closest('.filter-wrapper');
            if (parent) {
                const input = parent.querySelector('input');
                if (input) {
                    input.value = '';
                }
            }
            state[field] = '';
        }

        const filter = {};
        Object.keys(elements).forEach(key => {
            if (elements[key]) {
                if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) {  // ищем поля ввода в фильтре с непустыми данными
                    filter[`filter[${elements[key].name}]`] = elements[key].value;                 // чтобы сформировать в query вложенный объект фильтра
                }
            }
        })

        return Object.keys(filter).length ? Object.assign({}, query, filter) : query;  // если в фильтре что-то добавилось, применим к запросу
    }

    return {
        updateIndexes,
        applyFiltering
    }
}