export type EnquiryDeliveryState = {
  configuration: 'NOT_CONFIGURED'
  delivery: 'NOT_SENT'
}

export interface EnquiryProvider {
  getDeliveryState(): Promise<EnquiryDeliveryState>
}

class NotConfiguredEnquiryProvider implements EnquiryProvider {
  async getDeliveryState(): Promise<EnquiryDeliveryState> {
    return { configuration: 'NOT_CONFIGURED', delivery: 'NOT_SENT' }
  }
}

export const enquiryProvider: EnquiryProvider = new NotConfiguredEnquiryProvider()
