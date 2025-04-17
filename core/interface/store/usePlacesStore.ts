import { createPlacesStore } from './createPlacesStore';
import { PlaceRepositoryImpl } from '@/core/infrastructure/repositories/PlaceRepositoryImpl';

export const usePlacesStore = createPlacesStore(new PlaceRepositoryImpl());
