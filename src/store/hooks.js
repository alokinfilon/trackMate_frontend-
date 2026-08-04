import { useDispatch, useSelector } from 'react-redux';

/**
 * Typed Redux dispatch hook — use instead of plain useDispatch()
 * so thunks get proper type inference.
 */
export const useAppDispatch = () => useDispatch();

/**
 * Typed Redux selector hook — use instead of plain useSelector()
 */
export const useAppSelector = useSelector;
