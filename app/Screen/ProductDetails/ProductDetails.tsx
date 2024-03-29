import React, { useEffect, useState, useContext } from 'react'
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Linking,
  SafeAreaView,
} from 'react-native'
import Accordion from 'react-native-collapsible/Accordion'
import * as Animatable from 'react-native-animatable'
import ButtonRadius from './../../Components/ButtomRadius/ButtonRadius'
import analytics from '@react-native-firebase/analytics'
// @ts-ignore
import { GlobalContext } from './../../Context/GlobalContext'

const fullHeight = Dimensions.get('screen').height

type ProductDetailsProps = {
  navigation: any
  route: any
}

const ProductDetails = ({ navigation, route }: ProductDetailsProps) => {
  const [name, setName] = useState('')
  const [details, setDetails] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [activeSections, setActiveSections] = useState([])

  const context = useContext(GlobalContext) as any

  useEffect(() => {
    context?.handleChangeOutOfContainerBackgroundColor('#fff')
    // console.log([
    //   'route?.params?.productDetails',
    //   route?.params?.productDetails,
    // ])
    const productDetails = route?.params?.productDetails?.result
      ? route?.params?.productDetails?.result
      : null

    if (productDetails) {
      setName(productDetails?.name)
      setDetails(productDetails?.details)
      setIngredients(
        productDetails?.ingredients
          ? Object.values(
              productDetails?.ingredients.reduce(
                (acc, obj) => ({ ...acc, [obj.name]: obj }),
                {},
              ),
            )
          : [],
      )
      // console.log([
      //   'productDetails.ingredients',
      //   Object.values(
      //     productDetails?.ingredients.reduce(
      //       (acc, obj) => ({ ...acc, [obj.name]: obj }),
      //       {},
      //     ),
      //   ),
      // ])
    }
  }, [route?.params?.productDetails?.result])

  const renderHeader = (section: any, _: any) => {
    return (
      <Animatable.View
        duration={400}
        style={[
          styles.header,
          section.type === 'bad'
            ? styles.badIngredient
            : section.type === 'not good'
            ? styles.notGoodIngredient
            : section.type === 'good' && styles.goodIngredient,
        ]}
        transition="backgroundColor"
      >
        <Text style={styles.headerText}>{section.name}</Text>
      </Animatable.View>
    )
  }

  const openUrl = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err),
    )
  }

  const renderContent = (section: any, _: any, isActive: boolean) => {
    return (
      <View style={{ overflow: 'hidden' }}>
        <Animatable.View
          duration={400}
          style={[styles.content, isActive ? styles.active : styles.inactive]}
          transition="backgroundColor"
        >
          <Animatable.Text
            style={styles.ingredientsText}
            animation={isActive ? 'fadeIn' : undefined}
          >
            {section.description}
          </Animatable.Text>
          <Animatable.Text
            animation={isActive ? 'fadeIn' : undefined}
            onPress={() => openUrl(section.wiki_url)}
            style={styles.wikiUrl}
          >
            {`Źródło: ${section.wiki_title}`}
          </Animatable.Text>
        </Animatable.View>
      </View>
    )
  }

  const setSections = (sections: any) => {
    setActiveSections(sections.includes(undefined) ? [] : sections)
  }

  const handleScanNext = async () => {
    await analytics().logEvent('item_click', {
      item_name: 'ScanBarcode Next',
    })

    navigation.navigate('ScanBarcode')
  }

  return (
    <SafeAreaView style={[{ flex: 1 }, styles.container]}>
      <View style={styles.titleContainer}>
        <View style={styles.titleShadow}>
          <Text style={styles.title}>
            {route?.params?.notFound ? 'Nie znaleziono produktu' : name}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.details}>
          {details
            ? `Skład: ${details}`
            : route?.params?.notFound
            ? null
            : 'Nie znaleziono składu produktu.'}
        </Text>
        {ingredients && ingredients.length > 0 && (
          <Accordion
            activeSections={activeSections}
            sections={ingredients}
            touchableComponent={TouchableOpacity}
            expandMultiple={false}
            renderHeader={renderHeader}
            renderContent={renderContent}
            duration={400}
            onChange={setSections}
          />
        )}
      </ScrollView>
      <View style={styles.bottomBtnContainer}>
        <ButtonRadius
          text="Skanuj kolejny"
          backgroundColor="#5c8d89"
          textColor="#fff"
          action={handleScanNext}
        />
      </View>
    </SafeAreaView>
  )
}
export default ProductDetails

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: fullHeight - 25,
  },
  titleContainer: {
    overflow: 'hidden',
    backgroundColor: '#fff',
    paddingBottom: 10,
    width: '100%',
  },
  titleShadow: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
    // borderBottomLeftRadius: 15,
    // borderBottomRightRadius: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 20,
    paddingLeft: 10,
    color: '#333',
  },
  scrollContainer: {
    backgroundColor: '#fff',
    width: '100%',
  },
  details: {
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 10,
    textAlign: 'justify',
    paddingBottom: 20,
    paddingTop: 10,
    color: '#616161',
  },
  ingredientsText: {
    color: '#616161',
  },
  header: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
  },
  content: {
    padding: 20,
    backgroundColor: '#fff',
  },
  active: {
    backgroundColor: 'rgba(255,255,255,1)',
  },
  inactive: {
    backgroundColor: 'rgba(245,252,255,1)',
  },
  badIngredient: {
    backgroundColor: 'rgba(194, 95, 95,0.3)',
  },
  notGoodIngredient: {
    backgroundColor: 'rgba(244, 245, 181,0.3)',
  },
  goodIngredient: {
    backgroundColor: 'rgba(184, 245, 179,0.3)',
  },
  selectors: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  selector: {
    backgroundColor: '#F5FCFF',
    padding: 10,
  },
  activeSelector: {
    fontWeight: 'bold',
  },
  selectTitle: {
    fontSize: 14,
    fontWeight: '500',
    padding: 10,
  },
  multipleToggle: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 30,
    alignItems: 'center',
  },
  multipleToggle__title: {
    fontSize: 16,
    marginRight: 8,
  },
  bottomShadow: {
    backgroundColor: '#fff',
    height: 10,
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    paddingBottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  wikiUrl: {
    textAlign: 'right',
    paddingTop: 20,
    paddingBottom: 6,
    fontSize: 14,
    fontWeight: 'bold',
  },
  bottomBtnContainer: {
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 12,
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
})
