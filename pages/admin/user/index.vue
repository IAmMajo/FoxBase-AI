<script>
import { parseCSV } from "../components/csv-parser"; // Importiere die Funktion

export default {
  data() {
    return {
      users: [], // Hier werden die User Daten gestored, wenn sie da sind.
    };
  },
  async mounted() {
    await this.loadDefaultCSV();
  },
  methods: {
    async loadDefaultCSV() {
      try {
        const response = await fetch("/default.csv"); // Default-CSV aus public Verzeichnis
        if (!response.ok) throw new Error("Fehler beim Laden der Datei.");
        const csvData = await response.text();
        this.users = parseCSV(csvData); // csv Parser verwenden
      } catch (error) {
        console.error("Fehler beim Laden der Default-CSV:", error);
      }
    },
    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const csvData = e.target.result;
          this.users = parseCSV(csvData); // csv Parser verwenden
        };
        reader.readAsText(file);
      }
    },
  },
};
</script>


<template>
  <div>
    <!-- Titel -->
    <h2>Benutzerverwaltung</h2>

    <!-- Plus-Button und Datei-Upload -->
    <div style="margin-bottom: 1rem; display: flex; gap: 1rem;">
      <label for="file-upload" class="upload-button">Neue CSV hochladen</label>
      <input
        id="file-upload"
        type="file"
        accept=".csv"
        @change="onFileChange"
        style="display: none;"
      />
    </div>

    <!-- PrimeVue DataTable -->
    <DataTable :value="users" stripedRows tableStyle="min-width: 50rem">
      <Column field="id" header="ID"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="role" header="Rolle"></Column>
    </DataTable>
  </div>
</template>


<style scoped>
.upload-button {
  background-color: var(--dark-primary);
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  display: inline-block;
}
.upload-button:hover {
  background-color: var(--dark-primary-hover);
}
</style>
