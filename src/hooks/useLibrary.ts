import { loadSongs } from "@/lib/songs";
import { createExternalState } from "@/lib/state";

export const [useLibrary, properegateLibraryUpdate] = createExternalState(() => loadSongs());
