export function initSearching(searchField) {
    return (query, state, action) => {
        // Обрабатываем сброс поиска
        if (action && action.name === 'reset') {
            const searchInput = document.querySelector(`[data-name="${searchField}"]`);
            if (searchInput) {
                searchInput.value = '';
            }
            state[searchField] = '';
        }

        return state[searchField] ? Object.assign({}, query, {  // проверяем, что в поле поиска было что-то введено
            search: state[searchField]                          // устанавливаем в query параметр
        }) : query;                                             // если поле с поиском пустое, просто возвращаем query без изменений
    }
}