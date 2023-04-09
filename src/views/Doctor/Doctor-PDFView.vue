<!-- <template>
    <div>
      <h1>Overall Result</h1>
  
      <PDFViewer
        :source="url"
        style="height: 85vh; width: 100vw"
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
        pdfUrl: '/sample.pdf'
      }
    },
  }
  </script>
 -->


  
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
