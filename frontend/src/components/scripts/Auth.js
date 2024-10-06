import { postUserLogin } from "../handlers/HandlerPostAuth"; // Assure-toi du bon chemin

export default {
  name: "AuthPage_nloe",
  data() {
    return {
      loginData: {
        email: "killerbee",
        password: "password123",
      },
      errorMessage: "",
    };
  },
  methods: {
    async loginUser() {
      const jsonData = JSON.stringify({
        name: this.loginData.email,
        password: this.loginData.password,
      });

      try {
        await postUserLogin(jsonData);
        this.$router.push("/ingredients");
      } catch (error) {
        this.errorMessage =
          "Erreur lors de la connexion. Veuillez vérifier vos identifiants.";
        console.error("Error logging in:", error);
      }
    },
  },
};
