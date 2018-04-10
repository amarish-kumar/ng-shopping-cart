import { BaseCartItem } from '../../classes/base-cart-item';
import { SessionStorageCartService } from '../session-storage-cart.service';
import { TestCartItem } from './test-cart-item';

describe('sessionStorage Service', () => {
  describe('Service configuration', () => {
    beforeAll(() => {
      sessionStorage.removeItem('ServiceStorageConfig');
      sessionStorage.removeItem('NgShoppingCart');
    });

    it('should initialize the storage key provided as option', () => {
      expect(sessionStorage.getItem('ServiceStorageConfig')).toBeNull();
      const service = new SessionStorageCartService(BaseCartItem, { storageKey: 'ServiceStorageConfig' });
      expect(service['storageKey']).toEqual('ServiceStorageConfig');
    });

    it('should store a reference to the item class provided as option', () => {
      const service = new SessionStorageCartService(TestCartItem, {});
      expect(service['storageKey']).toEqual('NgShoppingCart');
      expect(service['itemClass']).toEqual(TestCartItem);
    });

    afterAll(() => {
      sessionStorage.removeItem('ServiceStorageConfig');
      sessionStorage.removeItem('NgShoppingCart');
    });
  });

  describe('Service operation', () => {
    const testKey = 'TestNgCartLocal';
    let service: SessionStorageCartService<BaseCartItem>;

    beforeEach(() => {
      sessionStorage.removeItem('TestNgCartLocal');
      service = new SessionStorageCartService<BaseCartItem>(BaseCartItem, { storageKey: testKey });
    });

    it('should count items', () => {
      expect(service.itemCount()).toBe(0);
      expect(service.getItems().constructor).toBe(Array);
      expect(service.getItems().length).toBe(0);
      expect(service.isEmpty()).toBe(true);
    });

    it('should add items', () => {
      const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
      service.addItem(item);
      expect(service.itemCount()).toBe(1);
      expect(service.getItems()[0].id).toBe(1);
      expect(service.isEmpty()).toBe(false);
    });

    it('should get items', () => {
      const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
      service.addItem(item);
      expect(service.itemCount()).toBe(1);
    });

    it('should remove items', () => {
      const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
      service.addItem(item);
      expect(service.itemCount()).toBe(1);
      expect(service.isEmpty()).toBe(false);
      service.removeItem(1);
      expect(service.itemCount()).toBe(0);
      expect(service.isEmpty()).toBe(true);
    });

    it('should count single items', () => {
      const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
      service.addItem(item);
      expect(service.entries()).toBe(10);
    });

    it('should compute the items cost', () => {
      const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
      service.addItem(item);
      expect(service.cost()).toBe(100);
    });

    it('should set the tax rate', () => {
      const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
      service.addItem(item);
      service.setTaxRate(10);
      expect(service.getTaxRate()).toBe(10);
    });

    it('should set shipping cost', () => {
      const item = new BaseCartItem({ id: 1, name: 'Test item', price: 10, photo: '', quantity: 10 });
      service.addItem(item);
      service.setShipping(10);
      expect(service.getShipping()).toBe(10);
    });

    afterAll(() => {
      sessionStorage.removeItem(testKey);
    });
  });
});