export function handleDragStart(event: DragEvent, stageId: string): void {
  if (event.dataTransfer) {
    event.dataTransfer.setData("text/plain", stageId);
    event.dataTransfer.effectAllowed = "move";
  }
}

export function handleDragOver(event: DragEvent): void {
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
}

export function handleDrop(event: DragEvent): string | null {
  event.preventDefault();
  const stageId = event.dataTransfer?.getData("text/plain");
  return stageId || null;
}
