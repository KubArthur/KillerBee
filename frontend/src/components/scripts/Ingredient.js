import { getIngredients } from "../handlers/HandlerGetIngredient";
import { deleteIngredient } from "../handlers/HandlerDeleteIngredient";
import { putIngredient } from "../handlers/HandlerPutIngredient"; // Handler pour mettre à jour
import { postIngredient } from "../handlers/HandlerPostIngredient"; // Importer le handler de création

export default {
  name: "IngredientPage",
  data() {
    return {
      ingredients: [],
      selectedIngredient: { name: "", description: "" },
      originalIngredient: null,
      newIngredient: { name: "", description: "" },
      isEditing: false,
      isCreating: false, // Ajoute un état pour savoir si on est en mode création
    };
  },
  async created() {
    await this.fetchIngredients();
  },
  methods: {
    async fetchIngredients() {
      try {
        this.ingredients = await getIngredients();
      } catch (error) {
        console.error("Unable to fetch ingredients:", error);
      }
    },
    selectIngredient(ingredient) {
      this.selectedIngredient = { ...ingredient };
      this.originalIngredient = { ...ingredient };
      this.isEditing = false;
      this.isCreating = false; // Si un ingrédient est sélectionné, on n'est plus en création
    },
    showCreateForm() {
      this.isCreating = true;
      this.selectedIngredient = { name: "", description: "" };
      this.isEditing = false;
    },
    async deleteSelectedIngredient(id) {
      try {
        await deleteIngredient(id);
        await this.fetchIngredients();
        this.selectedIngredient = { name: "", description: "" };
      } catch (error) {
        console.error("Error deleting ingredient:", error);
      }
    },
    async confirmUpdate() {
      if (this.selectedIngredient.id_ingredient) {
        const jsonData = JSON.stringify({
          id_ingredient: this.selectedIngredient.id_ingredient,
          name: this.selectedIngredient.name,
          description: this.selectedIngredient.description,
        });

        try {
          await putIngredient(jsonData);
          await this.fetchIngredients();
          this.isEditing = false;
        } catch (error) {
          console.error("Error updating ingredient:", error);
        }
      }
    },
    cancelUpdate() {
      this.selectedIngredient = { ...this.originalIngredient };
      this.isEditing = false;
    },
    async createNewIngredient() {
      const jsonData = JSON.stringify({
        name: this.newIngredient.name,
        description: this.newIngredient.description,
      });

      try {
        await postIngredient(jsonData);
        await this.fetchIngredients();
        this.newIngredient = { name: "", description: "" };
        this.isCreating = false;
      } catch (error) {
        console.error("Error creating ingredient:", error);
      }
    },
    cancelCreate() {
      this.isCreating = false;
    },
  },
};
