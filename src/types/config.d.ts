export { }

interface PACSParams {
  patient_id: string
  study_date: string
  patient_name: string
  accession_number: string
}

declare global {
  interface Window {
    config: {
      env: {
        api: {
          url: string
        }
      }
    }
  }
}
