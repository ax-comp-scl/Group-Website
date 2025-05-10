import SearchBar from './SearchBar'
import SelectComponent from './Select'

export default function DataSearchBar(props) {
  return (
    <>
      <SearchBar
        className="justify-between"
        onValueChange={props.onValueChange}
        onPress={props.onPress}
      >
        <SelectComponent
          label="Tipo de dado"
          options={props.options}
          defaultSelectedKeys={props.defaultSelectedKeys}
          setValue={props.setValue}
          disallowEmptySelection
        />
      </SearchBar>
    </>
  )
}
