public class MapDemo {
	public MapDemo(){
        System.debug('My First Demo Class Constructor Called');
    }
    
    public static void method1(){
        Map<Integer, String> intToStrMap1 = new Map<Integer, String>();
        Map<Integer, String> intToStrMap2 = new Map<Integer, String>();
        intToStrMap1.put(1, 'Red');
        intToStrMap1.put(2, 'Blue');
        intToStrMap1.put(3, 'Green');
        
        intToStrMap2.put(11, 'Yellow');
        intToStrMap2.put(12, 'Orange');
 
        intToStrMap1.putAll(intToStrMap2);
        System.debug('Map >>>>'+intToStrMap1);
        
        if(intToStrMap1.size()>0){
            System.debug('Get all the keys:'+intToStrMap1.keyset());
            System.debug('Get all the values:'+intToStrMap1.values());
        }
        
        if(intToStrMap1.equals(intToStrMap2)){
            System.debug('Both maps are equal');
        }else{
            System.debug('Both maps are not equal');
        }
    }
}