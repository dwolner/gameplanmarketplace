<template>
 
    <q-list class="full-width">
        <!-- <q-item-label header>Google Inbox style</q-item-label> -->

        <q-item v-if="index < 40" v-for="(item, index) in displayList" class="q-my-md q-pa-md bg-grey-1" style="border: 1px #efefef solid; border-radius: .5rem;">
            <q-item-section avatar top>
                <q-img v-if="item.imagesrc" :src="item.imagesrc" stlye="max-width: 100%;" />
                <q-icon else name="fas fa-home" size="lg" />
            </q-item-section>

            <q-item-section top>
                <q-item-label lines="1">
                    <h6 v-if="item.name" class="text-weight-medium text-primary">{{ item.name }}</h6>
                </q-item-label>
                <q-item-label caption lines="1">
                    <span v-if="item.tagstring" class="text-weight-medium">{{ item.tagstring }}</span>
                    <span else class="text-weight-medium">tag 1 | tag 2 | tag 3</span>
                </q-item-label>
                <q-item-label lines="1" class="q-mt-xs text-body2">
                    <span v-if="item.desc">{{ item.desc }}</span>
                    <span else>Short description that can go all the way to the end of the card so we can fit as much info as possible. It can even go to two lines, check that out!</span>
                </q-item-label>
            </q-item-section>

            <q-item-section top side>
                <div class="text-grey-8 q-gutter-xs">
                    <q-btn color="secondary" size="md">
                        Build Event
                    </q-btn>
                </div>
            </q-item-section>
        </q-item>

        <q-separator spaced />
    </q-list>

</template>

<script>

export default {
    name: 'venueList',

    data() {
        return {
            displayList: []
        }
    },
}
</script>
