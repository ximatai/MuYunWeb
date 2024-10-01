import { getCurrentInstance, onMounted } from 'vue';
export function useExposed(exposedRef) {
    const instance = getCurrentInstance();
    onMounted(() => {
        if (exposedRef.value?.$?.exposed) {
            const entries = Object.entries(exposedRef.value.$.exposed);
            for (const [key, value] of entries) {
                instance.exposed[key] = value;
            }
        }
    });
}