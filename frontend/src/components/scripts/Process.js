import { getProcesses } from "../handlers/HandlerGetProcess";
import { deleteProcess } from "../handlers/HandlerDeleteProcess";
import { putProcess } from "../handlers/HandlerPutProcess";
import { postProcess } from "../handlers/HandlerPostProcess";

export default {
  name: "ProcessPage",
  data() {
    return {
      processes: [],
      selectedProcess: {
        name: "",
        description: "",
        model: "",
        steps_and_descriptions_of_validation_tests: "",
        isActive: true,
      },
      originalProcess: null,
      newProcess: {
        name: "",
        description: "",
        model: "",
        steps_and_descriptions_of_validation_tests: "",
        isActive: true,
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
        alert(
          "Unable to fetch processes: " + (error.message || "Unknown error")
        );
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
        isActive: true,
      };
      this.isEditing = false;
    },

    async deleteSelectedProcess(id_process) {
      try {
        await deleteProcess(id_process);
        await this.fetchProcesses();
        this.selectedProcess = {
          name: "",
          description: "",
          model: "",
          steps_and_descriptions_of_validation_tests: "",
          isActive: true,
        };
        alert("Process deleted successfully");
      } catch (error) {
        alert("Error deleting process: " + (error.message || "Unknown error"));
        console.error("Error deleting process:", error);
      }
    },

    async confirmUpdate() {
      if (this.selectedProcess.id_process) {
        const jsonData = JSON.stringify({
          id_process: this.selectedProcess.id_process,
          name: this.selectedProcess.name,
          description: this.selectedProcess.description,
          model: this.selectedProcess.model,
          steps_and_descriptions_of_validation_tests:
            this.selectedProcess.steps_and_descriptions_of_validation_tests,
          isActive: this.selectedProcess.isActive,
        });

        try {
          await putProcess(jsonData);
          await this.fetchProcesses();
          this.isEditing = false;
          alert("Process updated successfully");
        } catch (error) {
          alert(
            "Error updating process: " + (error.message || "Unknown error")
          );
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
        model: this.newProcess.model,
        steps_and_descriptions_of_validation_tests:
          this.newProcess.steps_and_descriptions_of_validation_tests,
        isActive: this.newProcess.isActive,
      });

      try {
        await postProcess(jsonData);
        await this.fetchProcesses();
        this.newProcess = {
          name: "",
          description: "",
          model: "",
          steps_and_descriptions_of_validation_tests: "",
          isActive: true,
        };
        this.isCreating = false;
        alert("Process created successfully");
      } catch (error) {
        alert("Error creating process: " + (error.message || "Unknown error"));
        console.error("Error creating process:", error);
      }
    },

    cancelCreate() {
      this.isCreating = false;
    },
  },
};
