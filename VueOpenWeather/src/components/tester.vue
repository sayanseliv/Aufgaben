<template>
  <div v-if="errored">
    <p>We have no this city. Try to enter correct name of city</p>
  </div>
  <div v-else>
    {{ fields }}

    <table
      border="1px"
      v-bind:fields="fields.info"
      v-for="item in fields"
      :key="fields[item]"
      table
    >
      <tr>
        <td>Название</td>
        <td>Координаты</td>
        <td>Температура в Кельвинах</td>
        <td>Температура в градусах Цельсия</td>
        <td>Влажность</td>
      </tr>
      <tr>
        <td>{{ item.name }}</td>
        <td>долгота {{ item.lon }},ширина {{ item.lat }}</td>
        <td>{{ item.temp }}</td>
        <td>{{ Math.floor(item.temp - 273.15) }}</td>
        <td>{{ item.humidity }}</td>
      </tr>
    </table>
  </div>
</template>

<script>
export default {
  ButtonCustom: "ButtonCustom",
  model: {
    prop: "name",
    event: "input",
    fields: "fields",
    errored: "errored",
  },
  props: {
    val: Number,
    name: String,
    fields: Array,
    errored: Boolean,
  },
  // created () { работает
  // fetch(`https://api.openweathermap.org/data/2.5/weather?q=Odessa&appid=MyAPI`)
  // .then(resp => resp.json())
  // .then(data => {
  // this.currentInfo = {...data}
  // })
  // }
};
</script>

<style></style>
