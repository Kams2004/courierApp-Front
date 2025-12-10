export interface Courier {
  type: 'ENTRANT' | 'SORTANT';
  mailType: 'LETTRE' | 'COLIS' | 'RECOMMANDE';
  date: string;
  sender: string;
  recipient: string;
  object: string;
  departmentId: number;
}