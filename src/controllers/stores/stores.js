module.exports = class Stores {
    
    static GetStores(request, h) {
        const stores = ["San Francisco", "Monterrey", "El Paso", "Santa Helena"];
        return stores;
    }

    static GetStore(request, h) {
        let index = request.params.id;
        const stores = ["San Francisco", "Monterrey", "El Paso", "Santa Helena"];
        return stores[index - 1];
    }
}