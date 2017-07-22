class BaseData {
    constructor(db, ModelClass) {//, validator) {
        this.db = db;
        this.ModelClass = ModelClass;
        // this.validator = validator;
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    create(model) {
        // if (!this._isModelValid(model)) {
        //     return Promise.reject('Validation failed!');
        // }
        return this.collection.insert(model)
            .then(() => {
                return model;
            });
    }
    getAll() {
        return this.collection.find()
            .toArray()
            .then((models) => {
                if (this.ModelClass.toViewModel) {
                    return models.map(
                        (model) => this.ModelClass.toViewModel(model)
                    );
                }
                return models;
            });
    }
    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseData;