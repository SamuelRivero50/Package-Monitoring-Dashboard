/**
 * @author Samuel Rivero, Law, Juan Andrés Young Hoyos
 * @description Shared utility: maps a package status string to its Tailwind badge classes.
 */

export function statusBadgeClass(status: string): string {
  const map: Record<string, string> = {
    'In Transit': 'bg-amber-500/12 text-amber-500 border border-amber-500/20',
    Delivered: 'bg-green-500/12 text-green-500 border border-green-500/20',
    Pending: 'bg-soft/12 text-soft border border-soft/20',
    Exception: 'bg-red-500/12 text-red-500 border border-red-500/20',
  }
  return map[status] ?? 'bg-soft/12 text-soft border border-soft/20'
}
