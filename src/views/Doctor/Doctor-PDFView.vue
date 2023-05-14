  <template>
    <div>
  
      <PDFViewer
        :source="url"
        style="height: 100vh; width: 100vw"
        @download="handleDownload"
      />
      

    </div>
  </template>
  
  <script>
  import PDFViewer from 'pdf-viewer-vue'
  
  // OR THE FOLLOWING IMPORT FOR VUE 2
  // import PDFViewer from 'pdf-viewer-vue/dist/vue2-pdf-viewer'
  
  export default {
    components: {
      PDFViewer,
    },
  
    data() {
      return {
        url: '/sample.pdf',
      }
    },
  }
  </script>

  
  <!-- <template>
    <div class="pdf-container"></div>
  </template>

<script>
import PSPDFKit from "pspdfkit";

export default{
  name: 'PSPDFKitContainer',

  props: {
    pdfFile: {
      type: String,
      required: true,
    },
  },

  watch:{
    pdfFile(val){
      if(val){
        this.loadPSPDFKit();
      }
    },
  },

  mounted() {
    this.loadPSPDFKit().then((instance) => {
      this.$emit("loaded",instance);
    });
  },

  methods: {
    async loadPSPDFKit() {
      PSPDFKit.unload(".pdf-container");
      return PSPDFKit.load({
        document: this.pdfFile,
        container: ".pdf-container",
      });
    },
  },

  beforeUnmount() {
    PSPDFKit.unload(".pdf-container");
  },
};
</script>

<style scoped>
.pdf-container{
  height: 100vh;
}
</style> -->

