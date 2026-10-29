import { useState, useCallback } from 'react';

export interface UserCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

export interface GeolocationState {
  coordinates: UserCoordinates | null;
  isLoading: boolean;
  error: string | null;
  permissionStatus: 'prompt' | 'granted' | 'denied' | 'unavailable';
}

export function useUserLocation() {
  const [state, setState] = useState<GeolocationState>({
    coordinates: null,
    isLoading: false,
    error: null,
    permissionStatus: 'prompt',
  });

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState({
        coordinates: null,
        isLoading: false,
        error: 'Geolocation is not supported by your current browser environment.',
        permissionStatus: 'unavailable',
      });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coordinates: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
          },
          isLoading: false,
          error: null,
          permissionStatus: 'granted',
        });
      },
      (geoError) => {
        let msg = 'Failed to acquire location.';
        let permStatus: 'denied' | 'unavailable' = 'unavailable';

        switch (geoError.code) {
          case geoError.PERMISSION_DENIED:
            msg = 'Location access was declined. You can still explore the entire Pune dataset, use keyword search, or pick a starting landmark manually.';
            permStatus = 'denied';
            break;
          case geoError.POSITION_UNAVAILABLE:
            msg = 'Location signal is currently unavailable. Please verify GPS settings on your device.';
            break;
          case geoError.TIMEOUT:
            msg = 'The location request timed out. Please try clicking again.';
            break;
        }

        setState({
          coordinates: null,
          isLoading: false,
          error: msg,
          permissionStatus: permStatus,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
      }
    );
  }, []);

  const clearLocation = useCallback(() => {
    setState({
      coordinates: null,
      isLoading: false,
      error: null,
      permissionStatus: 'prompt',
    });
  }, []);

  return {
    ...state,
    requestLocation,
    clearLocation,
  };
}
