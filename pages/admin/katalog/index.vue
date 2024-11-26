<script></script>

<template>
  <div>
    <h2>Katalog</h2>
    <p>Auf dieser Seite wird er aktuelle Warenkatalog aufgelistet.</p>
    <h3>CSV Upload</h3>
    <div class="card">
      <Toast />
      <FileUpload
        name="demo[]"
        url="/api/upload"
        :multiple="true"
        accept="image/*"
        :max-file-size="1000000"
        @upload="onTemplatedUpload($event)"
        @select="onSelectedFiles"
      >
        <template
          #header="{ chooseCallback, uploadCallback, clearCallback, files }"
        >
          <div>
            <div
              class="flex flex-wrap justify-between items-center flex-1 gap-4"
            >
              <div class="flex gap-2">
                <Button
                  icon="pi pi-images"
                  rounded
                  outlined
                  severity="secondary"
                  @click="chooseCallback()"
                />
                <Button
                  icon="pi pi-cloud-upload"
                  rounded
                  outlined
                  severity="success"
                  :disabled="!files || files.length === 0"
                  @click="uploadEvent(uploadCallback)"
                />
                <Button
                  icon="pi pi-times"
                  rounded
                  outlined
                  severity="danger"
                  :disabled="!files || files.length === 0"
                  @click="clearCallback()"
                />
              </div>
              <ProgressBar
                :value="totalSizePercent"
                :show-value="false"
                class="md:w-20rem h-1 w-full md:ml-auto"
              >
                <span class="whitespace-nowrap">{{ totalSize }}B / 1Mb</span>
              </ProgressBar>
            </div>
          </div>
        </template>
        <template
          #content="{
            files,
            uploadedFiles,
            removeUploadedFileCallback,
            removeFileCallback,
          }"
        >
          <div>
            <div class="flex flex-col gap-8 pt-4">
              <div v-if="files.length > 0">
                <h5>Pending</h5>
                <div class="flex flex-wrap gap-4">
                  <div
                    v-for="(file, index) of files"
                    :key="file.name + file.type + file.size"
                    class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
                  >
                    <div>
                      <img
                        role="presentation"
                        :alt="file.name"
                        :src="file.objectURL"
                        width="100"
                        height="50"
                      />
                    </div>
                    <span
                      class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                      >{{ file.name }}</span
                    >
                    <div>{{ formatSize(file.size) }}</div>
                    <Badge value="Pending" severity="warn" />
                    <Button
                      icon="pi pi-times"
                      outlined
                      rounded
                      severity="danger"
                      @click="
                        onRemoveTemplatingFile(file, removeFileCallback, index)
                      "
                    />
                  </div>
                </div>
              </div>

              <div v-if="uploadedFiles.length > 0">
                <h5>Completed</h5>
                <div class="flex flex-wrap gap-4">
                  <div
                    v-for="(file, index) of uploadedFiles"
                    :key="file.name + file.type + file.size"
                    class="p-8 rounded-border flex flex-col border border-surface items-center gap-4"
                  >
                    <div>
                      <img
                        role="presentation"
                        :alt="file.name"
                        :src="file.objectURL"
                        width="100"
                        height="50"
                      />
                    </div>
                    <span
                      class="font-semibold text-ellipsis max-w-60 whitespace-nowrap overflow-hidden"
                      >{{ file.name }}</span
                    >
                    <div>{{ formatSize(file.size) }}</div>
                    <Badge value="Completed" class="mt-4" severity="success" />
                    <Button
                      icon="pi pi-times"
                      outlined
                      rounded
                      severity="danger"
                      @click="removeUploadedFileCallback(index)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template #empty>
          <div>
            <div class="flex items-center justify-center flex-col">
              <i
                class="pi pi-cloud-upload !border-2 !rounded-full !p-8 !text-4xl !text-muted-color"
              />
              <p class="mt-6 mb-0">Drag and drop files to here to upload.</p>
            </div>
          </div>
        </template>
      </FileUpload>
    </div>
  </div>
</template>

<style></style>
