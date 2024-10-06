import { getIngredients } from "../handlers/HandlerGetIngredient";
import { deleteIngredient } from "../handlers/HandlerDeleteIngredient";
import { putIngredient } from "../handlers/HandlerPutIngredient";
import { postIngredient } from "../handlers/HandlerPostIngredient";

export default {
  name: "IngredientPage",
  data() {
    return {
      ingredients: [],
      selectedIngredient: { name: "", description: "" },
      originalIngredient: null,
      newIngredient: { name: "", description: "" },
      isEditing: false,
      isCreating: false,
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
        alert(
          "Unable to fetch ingredients: " + (error.message || "Unknown error")
        );
        console.error("Unable to fetch ingredients:", error);
      }
    },
    selectIngredient(ingredient) {
      this.selectedIngredient = { ...ingredient };
      this.originalIngredient = { ...ingredient };
      this.isEditing = false;
      this.isCreating = false;
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
        alert("Ingredient deleted successfully");
      } catch (error) {
        alert(
          "Error deleting ingredient: " + (error.message || "Unknown error")
        );
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
          alert("Ingredient updated successfully");
        } catch (error) {
          alert(
            "Error updating ingredient: " + (error.message || "Unknown error")
          );
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
        alert("Ingredient created successfully");
      } catch (error) {
        alert(
          "Error creating ingredient: " + (error.message || "Unknown error")
        );
        console.error("Error creating ingredient:", error);
      }
    },
    cancelCreate() {
      this.isCreating = false;
    },
  },
};
