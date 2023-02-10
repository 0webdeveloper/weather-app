const state = {
    api_key: '4cb2a06b3d6eddb795aac575a32260c4',
    // city: JSON.parse(localStorage.getItem('city') || '[]'),
    weather: JSON.parse(localStorage.getItem('weather') || '[]'),
    warning: false,
    coords: ''
};
const getters = {
    // city_name(state) {
    //     return state.city;
    // },
    get_weather(state) {
        return state.weather;
    },
    watch_warning: state => state.warning
};
const mutations = {
    set_forecast(state, currentCity) {
        const uid = () => { // уникальный id
            const head = Date.now().toString(36);
            const tail = Math.random().toString(36).substring(2);
            return head + tail;
        }
        const weatherObj = {
            id: uid(),
            name: currentCity.name,
            temp: currentCity.main.temp,
            wind: currentCity.wind.speed,
            country: currentCity.sys.country,
            feels_like: currentCity.main.feels_like,
            icon: currentCity.weather[0].icon,
            description: currentCity.weather[0].description,
            humidity: currentCity.main.humidity
        }

        if (state.weather.length < 3) { // не больше 3 виджетов
            state.weather.push(weatherObj);
            localStorage.setItem('weather', JSON.stringify(state.weather))
        }
    },
    reorder_city(state, payload) {
        localStorage.setItem('weather', JSON.stringify(payload))
    },
    remove_city(state, id_delete) {
        state.weather = state.weather.filter(item => item.id !== id_delete);
        localStorage.setItem('weather', JSON.stringify(state.weather))
    },
    set_coords(state, payload) {
        state.coords = payload.loc.split(',');
    }
};
const actions = {
    async fetch_coords({commit}) { // Получаем координаты
        const request = await fetch("https://ipinfo.io/json?token=59ff531672e11e")
        const jsonResponse = await request.json()
        commit('set_coords', await jsonResponse)
    },
    async fetch_forecast({state, commit}) {  // При первом запуске виджета или пока пользователь не введет город в ручную
        try {
            if (!state.weather.length) { // Если массив городов пустой, получаем по координатам
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${state.coords[0]}&lon=${state.coords[1]}&units=metric&appid=${state.api_key}`);
                const data = await response.json();
                commit('set_forecast', await data);
            }
        } catch (error) {
            console.error(error)
        }

    },
    async set_new_city({state, commit}, city) { //

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${state.api_key}`);
        const data = await response.json();


        let city_name = data.name; //Преобразованное название города
        const search = city => state.weather.find(element => element.name === city); // Есть ли такой город в массиве
        const found = search(city_name);
        if (!found && data.cod != 404) {
            commit('set_forecast', data);
        }
    }
};
export default {
    state,
    getters,
    actions,
    mutations
};
