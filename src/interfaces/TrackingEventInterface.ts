/** @author David Hdez */
export interface TrackingEventInterface {
  id: number;
  location: string;
  description: string;
  createdAt: Date;

  // relations
  packageId: number;
}
