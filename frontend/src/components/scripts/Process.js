import { getProcesses } from "../handlers/HandlerGetProcess";
import { deleteProcess } from "../handlers/HandlerDeleteProcess";
import { putProcess } from "../handlers/HandlerPutProcess"; // Handler pour mettre à jour
import { postProcess } from "../handlers/HandlerPostProcess"; // Importer le handler de création

export default {
  name: "ProcessPage",
  data() {
    return {
      processes: [],
      selectedProcess: {
        name: "",
        model: "",
        description: "",
        steps_and_descriptions_of_validation_tests: "",
      },
      originalProcess: null,
      newProcess: {
        name: "",
        model: "",
        description: "",
        steps_and_descriptions_of_validation_tests: "",
      },
      isEditing: false,
      isCreating: false,
    };
  },
  async created() {
    await this.fetchProcesses();
  },
  methods: {
    async fetchProcesses() {
      try {
        this.processes = await getProcesses();
      } catch (error) {
        console.error("Unable to fetch processes:", error);
      }
    },
    selectProcess(process) {
      this.selectedProcess = { ...process };
      this.originalProcess = { ...process };
      this.isEditing = false;
      this.isCreating = false;
    },
    showCreateForm() {
      this.isCreating = true;
      this.selectedProcess = {
        name: "",
        description: "",
        model: "",
        steps_and_descriptions_of_validation_tests: "",
      };
      this.isEditing = false;
    },
    async deleteSelectedProcess(id) {
      try {
        await deleteProcess(id);
        await this.fetchProcesses();
        this.selectedProcess = {
          name: "",
          description: "",
          model: "",
          steps_and_descriptions_of_validation_tests: "",
        };
      } catch (error) {
        console.error("Error deleting process:", error);
      }
    },
    async confirmUpdate() {
      if (this.selectedProcess.id_process) {
        const jsonData = JSON.stringify({
          name: this.selectedProcess.name,
          description: this.selectedProcess.description,
          model: this.selectedProcess.model,
          steps_and_descriptions_of_validation_tests:
            this.selectedProcess.steps_and_descriptions_of_validation_tests,
        });

        try {
          await putProcess(jsonData);
          await this.fetchProcesses();
          this.isEditing = false;
        } catch (error) {
          console.error("Error updating process:", error);
        }
      }
    },
    cancelUpdate() {
      this.selectedProcess = { ...this.originalProcess };
      this.isEditing = false;
    },
    async createNewProcess() {
      const jsonData = JSON.stringify({
        name: this.newProcess.name,
        description: this.newProcess.description,
        model: this.selectedProcess.model,
        steps_and_descriptions_of_validation_tests:
          this.newProcess.steps_and_descriptions_of_validation_tests,
      });

      try {
        await postProcess(jsonData);
        await this.fetchProcesses();
        this.newProcess = {
          name: "",
          description: "",
          model: "",
          steps_and_descriptions_of_validation_tests: "",
        };
        this.isCreating = false;
      } catch (error) {
        console.error("Error creating process:", error);
      }
    },
    cancelCreate() {
      this.isCreating = false;
    },
  },
};
