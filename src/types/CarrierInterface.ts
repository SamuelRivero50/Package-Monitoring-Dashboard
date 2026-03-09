/**
 * @author Samuel Rivero, Dav, Juan Andrés Young Hoyos
 * @description Carrier type for Carrier Directory view. NOT in class diagram.
 */

export interface CarrierInterface {
  id: string
  name: string
  gradient: string
  activePackages: number
  avgDeliveryDays: number
}
