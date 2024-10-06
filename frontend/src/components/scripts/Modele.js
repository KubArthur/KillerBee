import { getModeles } from "../handlers/HandlerGetModele";
import { deleteModele } from "../handlers/HandlerDeleteModele";
import { putModele } from "../handlers/HandlerPutModele";
import { postModele } from "../handlers/HandlerPostModele";

export default {
  name: "ModelPage",
  data() {
    return {
      models: [],
      selectedModel: {
        name: "",
        description: "",
        unit_price_excluding_tax: "",
        range: "",
        weights: "",
        ingredients: [],
      },
      originalModel: null,
      newModel: {
        name: "",
        description: "",
        unit_price_excluding_tax: "",
        range: "",
        weights: "",
        ingredients: [],
      },
      isEditing: false,
      isCreating: false,
    };
  },
  async created() {
    await this.fetchModels();
  },
  methods: {
    async fetchModels() {
      try {
        this.models = await getModeles();
      } catch (error) {
        console.error("Unable to fetch models:", error);
      }
    },
    selectModel(model) {
      this.selectedModel = { ...model };
      this.originalModel = { ...model };
      this.isEditing = false;
      this.isCreating = false;
      this.selectedModel.ingredients = model.Cooks.map(cook => cook.id_ingredient);
    },
    showCreateForm() {
      this.isCreating = true;
      this.newModel = {
        name: "",
        description: "",
        unit_price_excluding_tax: "",
        range: "",
        weights: "",
        ingredients: [],
      };
      this.isEditing = false;
    },
    async deleteSelectedModel(id) {
      try {
        await deleteModele(id);
        await this.fetchModels();
        this.selectedModel = {
          name: "",
          description: "",
          unit_price_excluding_tax: "",
          range: "",
          weights: "",
          ingredients: [],
        };
      } catch (error) {
        console.error("Error deleting model:", error);
      }
    },
    async confirmUpdate() {
      if (this.selectedModel.id) {
        const jsonData = JSON.stringify({
          id: this.selectedModel.id,
          name: this.selectedModel.name,
          description: this.selectedModel.description,
          unit_price_excluding_tax: this.selectedModel.unit_price_excluding_tax,
          range: this.selectedModel.range,
          weights: this.selectedModel.weights,
          ingredients: this.selectedModel.ingredients, // Gérer les ingrédients comme un tableau
        });

        try {
          await putModele(jsonData);
          await this.fetchModels();
          this.isEditing = false;
        } catch (error) {
          console.error("Error updating model:", error);
        }
      }
    },
    cancelUpdate() {
      this.selectedModel = { ...this.originalModel };
      this.isEditing = false;
    },
    async createNewModel() {
      const jsonData = JSON.stringify({
        name: this.newModel.name,
        description: this.newModel.description,
        unit_price_excluding_tax: this.newModel.unit_price_excluding_tax,
        range: this.newModel.range,
        weights: this.newModel.weights,
        ingredients: this.newModel.ingredients, // Gérer les ingrédients comme un tableau
      });

      try {
        await postModele(jsonData);
        await this.fetchModels();
        this.newModel = {
          name: "",
          description: "",
          unit_price_excluding_tax: "",
          range: "",
          weights: "",
          ingredients: [],
        };
        this.isCreating = false;
      } catch (error) {
        console.error("Error creating model:", error);
      }
    },
    cancelCreate() {
      this.isCreating = false;
    },
    addIngredient() {
      this.selectedModel.ingredients.push('');
    },
    removeIngredient(index) {
      this.selectedModel.ingredients.splice(index, 1);
    },
    addNewIngredient() {
      this.newModel.ingredients.push('');
    },
    removeNewIngredient(index) {
      this.newModel.ingredients.splice(index, 1);
    },
  },
};