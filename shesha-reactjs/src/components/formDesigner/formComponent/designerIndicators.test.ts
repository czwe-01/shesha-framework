import { IComponentModelProps } from '@/providers';
import { getDesignerIndicators } from './designerIndicators';

const model = (props: Partial<IComponentModelProps>): IComponentModelProps =>
  ({ id: 'c1', type: 'textField', propertyName: 'name', ...props }) as IComponentModelProps;

describe('getDesignerIndicators', () => {
  it('shows nothing for a plainly configured component', () => {
    expect(getDesignerIndicators(model({}))).toEqual({
      showPermissions: false,
      showCustomLogic: false,
      showHidden: false,
    });
  });

  describe('hidden indicator', () => {
    it('shows for visible === false', () => {
      expect(getDesignerIndicators(model({ visible: false })).showHidden).toBe(true);
    });

    it('shows for the legacy hidden === true', () => {
      expect(getDesignerIndicators(model({ hidden: true })).showHidden).toBe(true);
    });

    it('shows for a property setting whose value is false', () => {
      const m = model({ visible: { _mode: 'value', _value: false, _code: undefined } as never });
      expect(getDesignerIndicators(m).showHidden).toBe(true);
    });

    it('does not show when visibility is decided by code - that is the FX indicator instead', () => {
      const m = model({ visible: { _mode: 'code', _value: false, _code: 'return false;' } as never });
      const result = getDesignerIndicators(m);
      expect(result.showHidden).toBe(false);
      expect(result.showCustomLogic).toBe(true);
    });
  });

  describe('custom logic indicator', () => {
    it('shows when editMode is driven by code', () => {
      const m = model({ editMode: { _mode: 'code', _value: 'editable', _code: 'return "editable";' } as never });
      expect(getDesignerIndicators(m).showCustomLogic).toBe(true);
    });

    it('shows when the legacy hidden property is driven by code', () => {
      const m = model({ hidden: { _mode: 'code', _value: true, _code: 'return true;' } as never });
      expect(getDesignerIndicators(m).showCustomLogic).toBe(true);
    });
  });

  describe('permissions indicator', () => {
    it('shows for visibility permissions on an otherwise visible component', () => {
      expect(getDesignerIndicators(model({ visiblePermissions: ['admin'] })).showPermissions).toBe(true);
    });

    it('shows for edit-mode permissions', () => {
      expect(getDesignerIndicators(model({ editModePermissions: ['admin'] })).showPermissions).toBe(true);
    });

    // A component that is switched off is never shown, so visibility permissions cannot change that
    // outcome and the padlock would only duplicate what the crossed-out eye already says.
    it('is suppressed when the component is explicitly hidden', () => {
      const result = getDesignerIndicators(model({ visible: false, visiblePermissions: ['admin'] }));
      expect(result.showPermissions).toBe(false);
      expect(result.showHidden).toBe(true);
    });

    it('still shows for edit-mode permissions even when the component is hidden', () => {
      const result = getDesignerIndicators(model({
        visible: false,
        visiblePermissions: ['admin'],
        editModePermissions: ['admin'],
      }));
      expect(result.showPermissions).toBe(true);
      expect(result.showHidden).toBe(true);
    });

    it('is not suppressed when visibility is decided by code rather than switched off', () => {
      const m = model({
        visible: { _mode: 'code', _value: false, _code: 'return false;' } as never,
        visiblePermissions: ['admin'],
      });
      expect(getDesignerIndicators(m).showPermissions).toBe(true);
    });

    it('ignores an empty permissions array', () => {
      expect(getDesignerIndicators(model({ visiblePermissions: [] })).showPermissions).toBe(false);
    });
  });
});
