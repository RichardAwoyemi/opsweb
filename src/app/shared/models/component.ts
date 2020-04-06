export interface IComponent {
  setActiveEditComponent(): void;

  clearActiveEditComponent(): void;

  setComponentClass(): string;

  setContextMenu(): string;
}
